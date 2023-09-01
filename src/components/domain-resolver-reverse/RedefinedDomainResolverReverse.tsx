import React, { useCallback, useEffect, useMemo, useState } from "react";
import _debounce from 'lodash/debounce';
import styled, {ThemeProvider} from "styled-components";
import {
  ContainerProps,
  InputProps,
  LogoProps,
  RedefinedDomainResolverReverseProps
} from "../../types";
import gradientLogo from "../../assets/small-logo.svg";
import blackLogo from "../../assets/black-small-logo.svg";
import {baseStyle, darkTheme, lightTheme} from "../../styles/baseStyle";
import GlobalStyle from "../../styles/globalStyle";
import {RedefinedResolver} from "@redefined/name-resolver-js";
import DropDown from "./DropDown";

const RedefinedDomainResolverReverse = (props: RedefinedDomainResolverReverseProps) => {
  const {width, height, disabled, placeholder, autoFocus, theme, resolverOptions, onUpdate} = props;
  const [dropDownActive, setDropDownActive] = useState(false);
  const [domain, setDomain] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const reverser = useMemo(() => new RedefinedResolver(resolverOptions), []);

  let actualResolveRequestVersion = 0;

  useEffect(() => {
    if (!domain.length) setDropDownActive(false);
  }, [domain]);

  const resolveDomain = async (value: string) => {
    onUpdate(null);
    setAddresses([]);
    setError("");
    if (value.length) {
      const version = Date.now();
      setDropDownActive(true);
      setLoading(true);

      try {
        actualResolveRequestVersion = version;
        const { response, errors } = (await reverser.reverse(value));
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
            content={addresses}
            onChange={onChangeValue}
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

export default RedefinedDomainResolverReverse;
