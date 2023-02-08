import React, {useCallback, useEffect, useState} from "react";
import _debounce from 'lodash/debounce';
import styled from "styled-components";
import DropDown from "./DropDown";
import {ContainerProps, RedefinedDomainResolverProps, InputProps} from "../types";
import companyLogo from '../assets/small-logo.svg';
import {baseStyle} from "../styles/baseStyle";
import GlobalStyle from "../styles/globalStyle";
import { RedefinedResolver } from "redefined-resolver";

const RedefinedDomainResolver = (props: RedefinedDomainResolverProps) => {
  const {onSelect} = props;
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
      <Container>
        <GlobalStyle/>
        <InputContainer onClick={onInputClick}>
          <StyledLogo src={companyLogo} alt="logo"/>
          <StyledInput value={domain} onChange={onChangeInput}/>
        </InputContainer>
        <DropDown
          active={dropDownActive}
          loading={loading}
          error={error}
          content={addresses}
          onChange={onChangeValue}
          onClickOutside={() => setDropDownActive(false)}
        />
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
  padding: 0 0 0 calc(${baseStyle.input.height} + 2 * ${baseStyle.input.borderWidth} - 2 * ${baseStyle.input.logo.paddingTop} + ${baseStyle.input.logo.paddingLeft} + 3px);
  width: 100%;
  font-family: ${baseStyle.input.fontFamily};
  font-size: ${baseStyle.input.fontSize};
  color: ${baseStyle.input.color};
  height: ${p => p.height || baseStyle.input.height};
  border-radius: ${baseStyle.input.borderRadius};
  outline-color: ${baseStyle.input.outlineColor};
  border-color: ${baseStyle.input.borderColor};
  border-width: ${baseStyle.input.borderWidth};
`;

const StyledLogo = styled.img`
  width: calc(${baseStyle.input.height} + 2 * ${baseStyle.input.borderWidth} - 2 * ${baseStyle.input.logo.paddingTop});
  position: absolute;
  padding-top: ${baseStyle.input.logo.paddingTop};
  padding-left: ${baseStyle.input.logo.paddingLeft};
  background: black;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`

export default RedefinedDomainResolver;
