import React, {useCallback, useEffect, useState} from "react";
import _debounce from 'lodash/debounce';
import styled, {ThemeProvider} from "styled-components";
import DropDown from "./DropDown";
import {ContainerProps, RedefinedDomainResolverProps, InputProps} from "../types";
import companyLogo from '../assets/small-logo.svg';
import {baseStyle, darkTheme, lightTheme} from "../styles/baseStyle";
import GlobalStyle from "../styles/globalStyle";
import {RedefinedResolver} from "redefined-resolver";

const RedefinedDomainResolver = (props: RedefinedDomainResolverProps) => {
  const {width, height, theme, onSelect} = props;
  const [dropDownActive, setDropDownActive] = useState(false);
  const [domain, setDomain] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    domain.length === 0 && setDropDownActive(false);
  }, [domain])

  const handleDebounceFn = async (value: string) => {
    if (value.length > 0) {
      setDropDownActive(true);
      setLoading(true);
      setAddresses([]);
      setError("");
      await new RedefinedResolver().resolve(value)
        .then((res) => setAddresses(res))
        .catch(error => setError(error));
      setLoading(false);
    }
  }

  const fetchAddresses = useCallback(_debounce(handleDebounceFn, 500), []);

  const onChangeValue = (value) => {
    setDropDownActive(false);
    onSelect(value);
  }

  const onInputClick = () => {
    domain.length > 0 && setDropDownActive(true);
  }

  const onChangeInput = (e) => {
    setDomain(e.target.value);
    fetchAddresses(e.target.value);
  }

  return (
    <Container width={width}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle/>
      <InputContainer onClick={onInputClick}>
        <StyledLogo src={companyLogo} alt="logo"/>
        <StyledInput height={height} value={domain} onChange={onChangeInput}/>
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
  position: fixed;
`

const InputContainer = styled.div`
  display: flex;
`

const StyledInput = styled.input<InputProps>`
  padding: 0 0 0 calc(${baseStyle.input.height} + 2 * ${baseStyle.input.borderWidth} - ${baseStyle.input.logo.padding});
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  font-family: ${baseStyle.input.fontFamily};
  font-size: ${baseStyle.input.fontSize};
  color: ${({ theme }) => theme.colors.primary};
  height: ${p => p.height || baseStyle.input.height};
  border-radius: ${baseStyle.input.borderRadius};
  outline-color: ${baseStyle.input.outlineColor};
  border-color: ${baseStyle.input.borderColor};
  border-width: ${baseStyle.input.borderWidth};
`;

const StyledLogo = styled.img`
  width: calc(${baseStyle.input.height} + 2 * ${baseStyle.input.borderWidth} - 2 * ${baseStyle.input.logo.padding});
  position: absolute;
  bottom: ${baseStyle.input.logo.padding};
  left: ${baseStyle.input.logo.padding};
  background: ${({ theme }) => theme.colors.background};
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`

export default RedefinedDomainResolver;
