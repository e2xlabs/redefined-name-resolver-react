import React, { useCallback, useEffect, useMemo, useState } from "react";
import _debounce from 'lodash/debounce';
import styled, { ThemeProvider } from "styled-components";
import {
    ContainerProps,
    RedefinedDomainResolverProps,
    InputProps,
    LogoProps,
    Asset,
    ResolveResponse,
    ReverseResponse,
    Account,
    ReverseAccount,
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

const RedefinedDomainResolver = (props: RedefinedDomainResolverProps) => {
    const { width, height, placeholder, disabled, autoFocus, theme, type, hiddenAddressGap, resolverOptions, onUpdate } = props;
    const [dropDownActive, setDropDownActive] = useState(false);
    const [domain, setDomain] = useState("");
    const [addresses, setAddresses] = useState<Account[]>([]);
    const [domains, setDomains] = useState<ReverseAccount[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [assets, setAssets] = useState<Asset[]>([]);
    const [fetchInterval, setFetchInterval] = useState<any>(null);
    const [reFetchTime, setReFetchTime] = useState<null | string>(null);

    let actualResolveRequestVersion = 0;

    useEffect(() => {
        if (!domain.length) setDropDownActive(false);
    }, [domain]);

    const fetchAssets = useCallback(async () => {
        try {
            const response = await fetch(ASSETS_URL);
            setAssets(await response.json());
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        fetchAssets();
    }, [fetchAssets]);

    const resolve = useCallback(async (domain: string) => {

        const params = new URLSearchParams();

        params.set('domain', domain);

        const networks = props.resolverOptions?.networks;
        if (networks) {
            params.set('networks', networks?.join(","));
        }

        const vendors = props.resolverOptions?.vendors;
        if (vendors) {
            params.set('vendors', vendors?.join(","));
        }

        try {
            return (await axios.get<ResolveResponse>(`${API_URL}/resolve?${params.toString()}`)).data;
        } catch (e) {
            throw Error(`Failed to resolve! ${e.message}`);
        }
    }, []);

    const reverse = useCallback(async (address: string) => {
        const params = new URLSearchParams();

        params.set('address', address);

        const vendors = props.resolverOptions?.vendors;
        if (vendors) {
            params.set('vendors', vendors?.join(","));
        }

        try {
            return (await axios.get<ReverseResponse>(`${API_URL}/reverse?${params.toString()}`)).data;
        } catch (e) {
            throw Error(`Failed to reverse! ${e.message}`);
        }
    }, []);

    const initiateAutoFetchTimeout = useCallback((fetchedAt: number) => {
        const eventTime = moment().add(fetchedAt, "milliseconds").unix();

        const interval = setInterval(() => {
            const currentTime = moment().unix();
            const diffTime = eventTime - currentTime;

            const durationMoment = moment.duration(diffTime * 1000, "milliseconds");
            const seconds = durationMoment.seconds();

            if (seconds <= 0) {
                clearFetchInterval();
                setReFetchTime(null);
                // reFetchDomain();
                return;
            }

            setReFetchTime(`00:${seconds > 10 ? seconds : `0${seconds}`}`);
        }, 1000);

        setFetchInterval(interval);
    }, []);

    const clearFetchInterval = useCallback(() => {
        setFetchInterval(interval => {
            clearInterval(interval);
            return null;
        })
    }, [])

    const reFetchDomain = useCallback(() => {
        setDomain(domain => {
            resolveDomain(domain);
            return domain;
        })
    }, [])

    const resolveDomain = async (value: string) => {
        onUpdate(null);
        setAddresses([]);
        setDomains([]);
        setError("");
        setReFetchTime(null);
        clearFetchInterval();

        if (value.length) {
            const version = Date.now();
            setDropDownActive(true);
            setLoading(true);

            try {
                actualResolveRequestVersion = version;

                let resolverResponse: ResolveResponse;
                let reverseResponse: ReverseResponse;

                switch (type || "resolve") {
                    case "resolve":
                        resolverResponse = await resolve(value);
                        if (resolverResponse.data.length) {
                            initiateAutoFetchTimeout(resolverResponse.expiresAt)
                        }
                        break;
                    case "reverse":
                        reverseResponse = await reverse(value);
                        if (reverseResponse.data.length) {
                            initiateAutoFetchTimeout(reverseResponse.expiresAt)
                        }
                        break;
                }

                if (version == actualResolveRequestVersion) {
                    setAddresses(resolverResponse?.data || []);
                    setDomains(reverseResponse?.data || []);
                }
            } catch (e) {
                setError(e)
            }
            if (version == actualResolveRequestVersion) {
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

    const onChangeInput = (e) => {
        setDomain(e.target.value);
        resolveDomainWithDebounce(e.target.value);
    }

    return (
        <Container width={width}>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                <RedefinedDomainResolverProvider type={type} assets={assets} hiddenAddressGap={hiddenAddressGap}>
                    <GlobalStyle/>
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
                    </InputContainer>
                    <DropDown
                        active={dropDownActive}
                        loading={loading}
                        error={error}
                        resolveContent={addresses}
                        reverseContent={domains}
                        onChange={onChangeValue}
                        onClickOutside={() => setDropDownActive(false)}
                    />
                    {reFetchTime && <StyledTimeout>Re-fetch after {reFetchTime}</StyledTimeout>}
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
  padding: 0 0 0 calc(${p => p.height || baseStyle.input.height} + 2 * ${baseStyle.input.borderWidth} - ${baseStyle.input.logo.padding} + ${baseStyle.input.logo.width} / 2);
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

const StyledTimeout = styled.div<LogoProps>`
  position: absolute;
  bottom: 2px;
  right: ${baseStyle.input.logo.padding};
  font-size: ${baseStyle.input.timeout.fontSize};
  color: ${(props) => props.theme.type === "light" ? "#222222" : "#ffffff"};
`
export default RedefinedDomainResolver;
