import React, { useCallback, useEffect, useMemo, useState } from "react";
import _debounce from 'lodash/debounce';
import styled, {ThemeProvider} from "styled-components";
import {ContainerProps, RedefinedDomainResolverProps, InputProps, LogoProps, Asset} from "../../types";
import companyLogo from "../../assets/small-logo.svg";
import {baseStyle, darkTheme, lightTheme} from "../../styles/baseStyle";
import GlobalStyle from "../../styles/globalStyle";
import DropDown from "../dropdown";
import {RedefinedResolver} from "@redefined/name-resolver-js";
import {ASSETS_URL} from "../../config";

const RedefinedDomainResolver = (props: RedefinedDomainResolverProps) => {
  const {width, height, disabled, autoFocus, theme, hiddenAddressGap, resolverOptions, onUpdate} = props;
  const [dropDownActive, setDropDownActive] = useState(false);
  const [domain, setDomain] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const resolver = useMemo(() => new RedefinedResolver(resolverOptions), []);

  let actualResolveRequestVersion = 0;

  useEffect(() => {
    if (domain.length === 0) setDropDownActive(false);
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

  const resolveDomain = async (value: string) => {
    onUpdate(null);
    setAddresses([]);
    setError("");
    if (value.length > 0) {
      const version = new Date().valueOf();
      setDropDownActive(true);
      setLoading(true);

      try {
        actualResolveRequestVersion = version;
        const { response, errors } = (await resolver.resolve(value));
        if (
          !response.length && errors.some(it => (
            it.vendor.includes("redefined")
            && it.error.includes("No records found for domain")
          ))
        ) {
          setError( `This domain is registered but has no records.`)
        } else {
          if (version == actualResolveRequestVersion) {
            setAddresses(response);
          }
        }
      } catch (e) {
        setError(e)
      }
      if (version == actualResolveRequestVersion) {
        setLoading(false);
      }
    }
  }

  const resolveDomainWithDebounce
    = useCallback(_debounce(resolveDomain, 500), []);

  const onChangeValue = (value) => {
    setDropDownActive(false);
    onUpdate(value);
  }

  const onInputClick = () => {
    domain.length > 0 && setDropDownActive(true);
  }

  const onChangeInput = (e) => {
    setDomain(e.target.value);
    resolveDomainWithDebounce(e.target.value);
  }

  return (
    <Container width={width}>
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <GlobalStyle/>
          <InputContainer onClick={onInputClick}>
            <StyledLogo inputHeight={height} disabled={disabled} src={companyLogo} alt="logo"/>
            <StyledInput isDropDownActive={dropDownActive} disabled={disabled} autoFocus={autoFocus} height={height} value={domain} onChange={onChangeInput}/>
          </InputContainer>
          <DropDown
            active={dropDownActive}
            loading={loading}
            error={error}
            content={addresses}
            onChange={onChangeValue}
            hiddenAddressGap={hiddenAddressGap}
            assets={assets}
            onClickOutside={() => setDropDownActive(false)}
          />
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
`

const StyledInput = styled.input<InputProps>`
  padding: 0 0 0 calc(${p => p.height || baseStyle.input.height} + 2 * ${baseStyle.input.borderWidth} - ${baseStyle.input.logo.padding});
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
  width: calc(${p => p.inputHeight || baseStyle.input.height} + 2 * ${baseStyle.input.borderWidth} - 2 * ${baseStyle.input.logo.padding});
  position: absolute;
  bottom: ${baseStyle.input.logo.padding};
  left: ${baseStyle.input.logo.padding};
  background: ${(props) => props.disabled ? props.theme.colors.disabled : props.theme.colors.background};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`

export default RedefinedDomainResolver;
