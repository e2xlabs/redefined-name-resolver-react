import React, {useEffect, useState} from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import {InputFieldProps} from "../types";
import {getErrorMessage} from "../utils";
import companyLogo from '../assets/small-logo.svg';

const RedefinedDomainResolver = (props: InputFieldProps) => {
  const [dropDownActive, setDropDownActive] = useState(false);
  const [domain, setDomain] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDropDownActive(false);
  },[address])

  useEffect(() => {
     setDropDownActive(domain.length > 0);
  },[domain])

  const onChangeValue = (value) => {
    setAddress(value);
  }

  return (
    <Container>
      <InputContainer>
        <StyledImage src={companyLogo} alt="logo" />
        <Input value={domain} onChange={(e) => setDomain(e.target.value)} />
      </InputContainer>
      <DropDown active={dropDownActive} content={content} onChange={onChangeValue}/>
      {error ? <ErrorMsg>{getErrorMessage(error)}</ErrorMsg> : null}
    </Container>
  );
}

const Container = styled.div`
  width: 20vw;
  position: fixed;
`

const InputContainer = styled.div`
  display: flex;
`

const ErrorMsg = styled.div`
  color: #cc0033;
  display: inline-block;
  font-size: 13px;
  line-height: 16px;
`;

const Input = styled.input`
  padding: 0 0 0 40px;
  width: 100%;
  font-family: "Poppins", serif;
  font-size: 16px;
  color: #222222;
  min-height: 40px;
  border-radius: 8px;
  outline-color: #C7C7C7;
  border-color: #707070;
  border-width: 1px;
`;

const StyledImage = styled.img` 
  width: 30px;
  position: absolute;
  padding-top: 5px;
  padding-left: 5px;
`

const content = [
  "D3y4Qj4t2YrtxjFA3snjbAGTriTvWkNMRJEWwqEZCC3T",
  "0xCFf789960Bc9B919010321943A4DBC4fC1a3C726",
  "terra1280ext9wmt8xc4gz6hzyrvt4n8ph65vnl0ml4k"
]

export default RedefinedDomainResolver;
