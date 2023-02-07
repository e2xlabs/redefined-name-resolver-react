import React from "react";
import styled from "styled-components";
import {DropdownProps} from "../types";
import Icon from "@mdi/react";
import {mdiContentCopy} from "@mdi/js";
import {copyText, getAbbreviatedAddress} from "../utils";

const DropDown = (props: DropdownProps) => {
  const {active, content, onChange} = props;
  return active ? (
      <DropDownWrapper>
        <UnorderedList>
          {content && content.map((item, key) => {
            return (
                <ListItem key={key}>
                  <ItemWrapper>
                    <StyledItem onClick={() => {
                      onChange(item)
                    }}>
                      {getAbbreviatedAddress(item)}
                    </StyledItem>
                    <WrapperIcon onClick={() => copyText(item)}><StyledIcon path={mdiContentCopy}/></WrapperIcon>
                  </ItemWrapper>
                </ListItem>
            );
          })}
        </UnorderedList>
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
  height: fit-content;
`

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px;
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

export default DropDown;