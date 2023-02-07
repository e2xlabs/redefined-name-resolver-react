import React, {useState} from "react";
import styled from "styled-components";
import {DropdownProps} from "../types";
import Icon from "@mdi/react";
import {mdiContentCopy} from "@mdi/js";
import {CoinLogos, copyText, getAbbreviatedAddress} from "../utils";
import Chips from "./Chips";
import {type Account} from "redefined-resolver";
import ReactLoading from "react-loading";

const DropDown = (props: DropdownProps) => {
  const {active, domain, onChange} = props;
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);

  const onClick = async (network: string) => {
    console.log(domain, network);
    setContent([]);
    setLoading(true);
    setContent(await new Promise((resolve) =>
      setTimeout(() => {
        resolve(contentMock);
      }, 2000)));
    setLoading(false);
  }
  return active ? (
    <DropDownWrapper>
      <Chips onClick={onClick}/>
      {loading ? <StyledLoader type="spinningBubbles" color={"#faab1e"} height={20} width={20}/> : null}
      {content && content.length > 0 ? <UnorderedList>
        {content.map((item, key) => {
          return (
            <ListItem key={key}>
              <ItemWrapper>
                <StyledContent>
                  <StyledLogo width="32px" src={CoinLogos[item.network.toLocaleUpperCase()]} alt="coinLogo"/>
                  <StyledItem onClick={() => {
                    onChange(item.address)
                  }}>
                    {getAbbreviatedAddress(item.address)}
                  </StyledItem>
                </StyledContent>
                <WrapperIcon onClick={() => copyText(item.address)}>
                  <StyledIcon path={mdiContentCopy}/>
                </WrapperIcon>
              </ItemWrapper>
            </ListItem>
          );
        })}
      </UnorderedList> : null}
    </DropDownWrapper>
  ) : null;
}

const DropDownWrapper = styled.div`
  background-color: #fff;
  position: absolute;
  width: calc(100% - 2px);
  border-radius: 8px;
  border: 1px solid #707070;
  overflow: hidden;
  transition: 0.5s ease all;
`

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px;
  max-height: 30vh;
  overflow: auto;
`

const ListItem = styled.li`
  padding: 10px 0;
  color: #3d3e3f;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 26px;
  text-transform: capitalize;
  font-weight: 300;
`

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLogo = styled.img`
  margin-right: 15px;
  border-radius: 32px;
`

const WrapperIcon = styled.div`
  position: relative;
`

const StyledIcon = styled(Icon)`
  width: 24px;
  color: black;
  cursor: pointer;

  :hover {
    color: #faab1e;
    transition: 0.5s ease all;
  }
`

const StyledItem = styled.div`
  cursor: pointer;

  :hover {
    color: #faab1e;
    transition: 0.5s ease all;
  }
`

const StyledLoader = styled(ReactLoading)`
  margin: 0 auto;
  padding-bottom: 10px;
`

const contentMock = [
  {address: "D3y4Qj4t2YrtxjFA3snjbAGTriTvWkNMRJEWwqEZCC3T", network: "bsc"},
  {address: "0xfF33696cECa08E010801799624Cf1E2dc91ecAeB", network: "bsc"},
  {address: "0xCFf789960Bc9B919010321943A4DBC4fC1a3C726", network: "eth"},
  // {address: "terra1280ext9wmt8xc4gz6hzyrvt4n8ph65vnl0ml4k", network: "LUNA"},
  {address: "GsYPSWAbXw4YsSEeowuTf7nqjExVxKS5tS1Yy9WwFAPG", network: "sol"},
  {address: "0xfF33696cECa08E010801799624Cf1E2dc91ecAeB", network: "eth"},
  {address: "zil1843tu9qtv5elf8c7lvcaxf3mgm7m8syte7ec47", network: "zil"},
  {address: "GsYPSWAbXw4YsSEeowuTf7nqjExVxKS5tS1Yy9WwFAPG", network: "sol"},
  {address: "0xfF33696cECa08E010801799624Cf1E2dc91ecAeB", network: "eth"},
  {address: "zil1843tu9qtv5elf8c7lvcaxf3mgm7m8syte7ec47", network: "zil"},
  {address: "GsYPSWAbXw4YsSEeowuTf7nqjExVxKS5tS1Yy9WwFAPG", network: "sol"},
  {address: "0xfF33696cECa08E010801799624Cf1E2dc91ecAeB", network: "eth"},
  {address: "zil1843tu9qtv5elf8c7lvcaxf3mgm7m8syte7ec47", network: "zil"},
  // {address: "GsYPSWAbXw4YsSEeowuTf7nqjExVxKS5tS1Yy9WwFAPG", network: "sol"},
  // {address: "0xfF33696cECa08E010801799624Cf1E2dc91ecAeB", network: "eth"},
  // {address: "zil1843tu9qtv5elf8c7lvcaxf3mgm7m8syte7ec47", network: "zil"},
  // {address: "GsYPSWAbXw4YsSEeowuTf7nqjExVxKS5tS1Yy9WwFAPG", network: "sol"},
  // {address: "0xfF33696cECa08E010801799624Cf1E2dc91ecAeB", network: "eth"},
  // {address: "zil1843tu9qtv5elf8c7lvcaxf3mgm7m8syte7ec47", network: "zil"},
] as Account[]

export default DropDown;