import React, { useCallback, useEffect, useRef, useState } from "react";
import _debounce from 'lodash/debounce';
import styled, { ThemeProvider } from "styled-components";
import {
    Account,
    Asset,
    ContainerProps,
    InputProps,
    LogoProps,
    RedefinedDomainResolverProps,
    ResolveResponse,
    ReverseAccount,
    ReverseResponse,
} from "../../types";
import gradientLogo from "../../assets/small-logo.svg";
import blackLogo from "../../assets/black-small-logo.svg";
import { baseStyle, darkTheme, lightTheme } from "../../styles/baseStyle";
import GlobalStyle from "../../styles/globalStyle";
import { API_URL, ASSETS_URL } from "../../config";
import DropDown from "../dropdown";
import { RedefinedDomainResolverProvider } from "../../context/RedefinedDomainResolverContext";
import axios from "axios";
import moment from "moment";
import ReactLoading from "react-loading";

const RedefinedDomainResolver = (props: RedefinedDomainResolverProps) => {
    const {
        width,
        height,
        placeholder,
        disabled,
        autoFocus,
        theme,
        type,
        hiddenAddressGap,
        resolverOptions,
        onUpdate
    } = props;
    const [dropDownActive, setDropDownActive] = useState(false);
    const [domain, setDomain] = useState("");
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [reverseAccounts, setReverseAccounts] = useState<ReverseAccount[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [assets, setAssets] = useState<Asset[]>([]);
    const [nextFetchTimeout, setNextFetchTimeout]= useState(0);
    const domainRef = useRef(domain);
    domainRef.current = domain;

    let actualResolveRequestVersion = 0;

    useEffect(() => {
        if (!domain.length) setDropDownActive(false);
    }, [domain]);

    const fetchAssets = useCallback(async () => {
        try {
            const response = await axios.get(ASSETS_URL);
            setAssets(response.data);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);

    const resolve = useCallback(async (domain: string) => {

        const params = new URLSearchParams();

        params.set('domain', domain);

        const networks = resolverOptions?.networks;
        if (networks) {
            params.set('networks', networks?.join(","));
        }

        const vendors = resolverOptions?.vendors;
        if (vendors) {
            params.set('vendors', vendors?.join(","));
        }

        try {
            return (await axios.get<ResolveResponse>(`${API_URL}/resolve?${params.toString()}`)).data;
        } catch (e) {
            throw Error(`Failed to resolve! ${e.message}`);
        }
    }, [resolverOptions]);

    const reverse = useCallback(async (address: string) => {
        const params = new URLSearchParams();

        params.set('address', address);

        const vendors = resolverOptions?.vendors;

        if (vendors) {
            params.set('vendors', vendors?.join(","));
        }

        try {
            return (await axios.get<ReverseResponse>(`${API_URL}/reverse?${params.toString()}`)).data;
        } catch (e) {
            throw Error(`Failed to reverse! ${e.message}`);
        }
    }, [resolverOptions]);

    const initiateAutoFetchTimeout = useCallback(async (fetchedAt: number) => {
        const now = moment();
        const diff = now.diff(fetchedAt);

        setNextFetchTimeout(60000 - diff);
    }, []);

    useEffect(() => {
        let timeout = setTimeout(async () => await resolveDomain(domainRef.current), nextFetchTimeout);

        return () => {
            clearTimeout(timeout);
        };
    }, [nextFetchTimeout])

    const resolveDomain = async (value: string) => {
        onUpdate(null);
        setError("");

        if (value.length) {
            const version = Date.now();
            setLoading(true);
            let completeness = 0;
            let isActual = false;
            let resolverResponse: ResolveResponse;
            let reverseResponse: ReverseResponse;

            try {
                actualResolveRequestVersion = version;

                do {

                    switch (type) {
                        case "resolve":
                            resolverResponse = await resolve(value);
                            completeness = resolverResponse?.completeness || 0;
                            break;
                        case "reverse":
                            reverseResponse = await reverse(value);
                            completeness = resolverResponse?.completeness || 0;
                            break;
                        default:
                            resolverResponse = await resolve(value);
                            reverseResponse = await reverse(value);
                            completeness = Math.min(resolverResponse?.completeness || 0, reverseResponse?.completeness || 0);
                    }

                    if (version == actualResolveRequestVersion) {
                        setAccounts(resolverResponse?.data || []);
                        setReverseAccounts(reverseResponse?.data || []);

                        const minFetchedAt = Math.min(
                            ...resolverResponse?.data.map(it => it.fetchedAt) || [],
                            ...reverseResponse?.data.map(it => it.fetchedAt) || []
                        );

                        isActual = !isFinite(minFetchedAt) || moment().diff(minFetchedAt) < 60000;
                    } else {
                        break;
                    }

                    if (completeness < 1 || !isActual) {
                        await new Promise((resolve) => setTimeout(resolve, 1000));
                    }
                } while (completeness < 1 || !isActual);

                if (resolverResponse?.data.length || reverseResponse?.data.length) {
                    await initiateAutoFetchTimeout(
                        Math.min(
                            ...resolverResponse?.data.map(it => it.fetchedAt) || [],
                            ...reverseResponse?.data.map(it => it.fetchedAt) || []
                        )
                    )
                }
            } catch (e) {
                console.log(e);
                setError(e)
            }
            if (version == actualResolveRequestVersion) {
                setDropDownActive(true);
                setLoading(false);
            }
        }
    }

    const resolveDomainWithDebounce = useCallback(_debounce(resolveDomain, 500), []);

    const onChangeValue = (value) => {
        setDropDownActive(false);
        onUpdate(value);
    }

    const onInputClick = () => {
        if (domain.length) {
            setDropDownActive(true);
        }
    }

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDomain(e.target.value);
        resolveDomainWithDebounce(e.target.value);
    }

    return (
        <Container width={width}>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                <RedefinedDomainResolverProvider type={type} assets={assets} hiddenAddressGap={hiddenAddressGap}>
                    <GlobalStyle />
                    <InputContainer onClick={onInputClick}>
                        <StyledLogo
                            inputHeight={height}
                            disabled={disabled}
                            src={theme === "dark" ? gradientLogo : blackLogo}
                            alt="logo"
                        />
                        <StyledLine />
                        <StyledInput
                            isDropDownActive={dropDownActive}
                            disabled={disabled}
                            autoFocus={autoFocus}
                            height={height}
                            placeholder={placeholder || "Type to search"}
                            value={domain}
                            onChange={onChangeInput}
                        />
                        {loading && (
                            <StyledLoader
                                type="spinningBubbles"
                                color={baseStyle.brandColor}
                                height={baseStyle.loader.height}
                                width={baseStyle.loader.height}
                            />
                        )}
                    </InputContainer>
                    <DropDown
                        active={dropDownActive}
                        error={error}
                        resolveContent={accounts}
                        reverseContent={reverseAccounts}
                        onChange={onChangeValue}
                        onClickOutside={() => setDropDownActive(false)}
                    />
                </RedefinedDomainResolverProvider>
            </ThemeProvider>
        </Container>
    );
}

const Container = styled.div<ContainerProps>`
  width: ${p => p.width || baseStyle.width};
  position: relative;
`

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledInput = styled.input<InputProps>`
  padding: 0 40px 0 calc(${p => p.height || baseStyle.input.height} + 2 * ${baseStyle.input.borderWidth} - ${baseStyle.input.logo.padding} + ${baseStyle.input.logo.width} / 2);
  width: 100%;
  background: ${(props) => props.disabled ? props.theme.colors.disabled : props.theme.colors.background};
  font-family: ${baseStyle.input.fontFamily};
  font-size: ${baseStyle.input.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  height: ${p => p.height || baseStyle.input.height};
  border-top-right-radius: ${baseStyle.input.borderRadius};
  border-top-left-radius: ${baseStyle.input.borderRadius};
  border-bottom-left-radius: ${(props) => props.isDropDownActive ? "0px" : baseStyle.input.borderRadius};
  border-bottom-right-radius: ${(props) => props.isDropDownActive ? "0px" : baseStyle.input.borderRadius};
  outline: none;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.borderColor};
  border-width: ${baseStyle.input.borderWidth};
`;

const StyledLogo = styled.img<LogoProps>`
  width: ${baseStyle.input.logo.width};
  position: absolute;
  bottom: ${baseStyle.input.logo.padding};
  left: ${baseStyle.input.logo.padding};
  top: 15%;
  background: ${(props) => props.disabled ? props.theme.colors.disabled : props.theme.colors.background};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`

const StyledLine = styled.div<LogoProps>`
  position: absolute;
  bottom: ${baseStyle.input.logo.padding};
  left: calc(${baseStyle.input.logo.width} + ${baseStyle.input.logo.padding});
  top: 35%;
  width: 2px;
  height: ${baseStyle.input.fontSize};
  background: ${(props) => props.theme.type === "light" ? "#222222" : "#ffffff"};
`

const StyledLoader = styled(ReactLoading)`
  position: absolute;
  right: 10px;
`;

export default RedefinedDomainResolver;
