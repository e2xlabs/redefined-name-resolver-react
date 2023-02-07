import {CoinLogos} from "../utils";
import React from "react";
import styled from "styled-components";

const Chips = (props: {onClick: (value) => void}) => {
  return (
    <StyledContainer>
      {(Object.keys(CoinLogos) as Array<keyof typeof CoinLogos>).map((key) =>
        <StyledContent onClick={() => props.onClick(key.toLowerCase())} key={key}>
          <StyledLogo width="32px" src={CoinLogos[key]} alt="coinLogo"/> {key}
        </StyledContent>
      )}
    </StyledContainer>
  )
}
const StyledContainer = styled.div`
  display: flex;
  padding: 10px 10px;
  justify-content: space-between;
`

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-right: 10px;

  :hover {
    border-radius: 32px;
    background: whitesmoke;
  }
`

const StyledLogo = styled.img`
  margin-right: 10px;
  border-radius: 32px;
`

export default Chips;