import React, {useCallback, useEffect, useState} from "react";
import _debounce from 'lodash/debounce';
import styled, {ThemeProvider} from "styled-components";
import {ContainerProps, RedefinedDomainResolverProps, InputProps, LogoProps} from "../../types";
import companyLogo from "../../assets/small-logo.svg";
import {baseStyle, darkTheme, lightTheme} from "../../styles/baseStyle";
import GlobalStyle from "../../styles/globalStyle";
import DropDown from "../dropdown";
import {RedefinedResolver} from "@redefined/name-resolver-js";

const RedefinedDomainResolver = (props: RedefinedDomainResolverProps) => {
  const {width, height, disabled, autoFocus, theme, hiddenAddressGap, resolverOptions, onSelect} = props;
  const [dropDownActive, setDropDownActive] = useState(false);
  const [domain, setDomain] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (domain.length === 0) setDropDownActive(false);
  }, [domain])

  const resolveDomain = async (value: string) => {
    if (value.length > 0) {
      setDropDownActive(true);
      setLoading(true);
      setAddresses([]);
      setError("");
      try {
        setAddresses(await new RedefinedResolver(resolverOptions).resolve(value));
      } catch (e) {
        setError(e)
      }
      setLoading(false);
    }
  }

  const resolveDomainWithDebounce
    = useCallback(_debounce(resolveDomain, 500), []);

  const onChangeValue = (value) => {
    setDropDownActive(false);
    onSelect(value);
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
