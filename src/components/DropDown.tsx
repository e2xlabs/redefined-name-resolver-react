import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import {DropdownProps} from "../types";
import Icon from "@mdi/react";
import {mdiContentCopy} from "@mdi/js";
import {CoinLogos, copyText, getAbbreviatedAddress, getErrorMessage} from "../utils";
import ReactLoading from "react-loading";
import {baseStyle} from "../styles/baseStyle";

const DropDown = (props: DropdownProps) => {
  const {active, content, loading, error, hiddenAddressGap, onChange, onClickOutside} = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && onClickOutside) {
         onClickOutside();
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  return active ? (
    <DropDownWrapper ref={ref}>
      {loading ? <StyledLoader type="spinningBubbles" color={baseStyle.brandColor} height={baseStyle.loader.height}
                               width={baseStyle.loader.height}/> : null}
      {!loading && content.length > 0 ? <UnorderedList>
        {content.sort((a, b) => a.network.localeCompare(b.network)).map((item, key) => {
          return (
            <ListItem key={key}>
              <ItemWrapper>
                <StyledContent>
                  <StyledLogo width={baseStyle.dropDown.logo.width} src={CoinLogos[item.network.toLocaleUpperCase()]}
                              alt="coinLogo"/>
                  <div onClick={() => {
                    onChange(item.address)
                  }}>
                    <StyledTitle>{getAbbreviatedAddress(item.address, hiddenAddressGap.indexA, hiddenAddressGap.indexB)}</StyledTitle>
                    <StyledSubTitle>{item.from}</StyledSubTitle>
                  </div>
                </StyledContent>
                <div onClick={() => copyText(item.address)}>
                  <StyledIcon path={mdiContentCopy}/>
                </div>
              </ItemWrapper>
            </ListItem>
          );
        })}
      </UnorderedList> : null}
      {!loading && !error && content.length == 0 ? <StyledNotFoundMessage>Addresses not found</StyledNotFoundMessage> : null}
      {error ? <StyledErrorMessage>{getErrorMessage(error)}</StyledErrorMessage> : null}
    </DropDownWrapper>
  ) : null;
}

const DropDownWrapper = styled.div`
  position: absolute;
  width: calc(100% - 2 * ${baseStyle.input.borderWidth});
  border-bottom-left-radius: ${baseStyle.input.borderRadius};
  border-bottom-right-radius: ${baseStyle.input.borderRadius};
  border: ${baseStyle.input.borderWidth} solid ${baseStyle.input.borderColor};
  background: ${({ theme }) => theme.colors.background};
  transition: 0.5s ease all;
`

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 3px 10px;
  max-height: 30vh;
  overflow: auto;
`

const ListItem = styled.li`
  padding: 10px 0;
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
  margin-right: 10px;
  border-radius: ${baseStyle.dropDown.logo.width};
`

const StyledIcon = styled(Icon)`
  width: ${baseStyle.dropDown.copyIcon.width};
  vertical-align: middle;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};

  :hover {
    color: ${baseStyle.brandColor};
    transition: 0.5s ease all;
  }
`

const StyledTitle = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;

  :hover {
    color: ${baseStyle.brandColor};
    transition: 0.5s ease all;
  }
`

const StyledSubTitle = styled.div`
  color: darkgrey;
  font-size: 12px;
`

const StyledLoader = styled(ReactLoading)`
  margin: 0 auto;
  padding: 10px;
`

const StyledErrorMessage = styled.div`
  color: ${baseStyle.error.color};
  display: flex;
  justify-content: center;
  padding: 10px;
  margin: 0 auto;
  font-size: ${baseStyle.error.fontSize};
`;

const StyledNotFoundMessage = styled(StyledErrorMessage)`
  color: ${({ theme }) => theme.colors.primary};
`

export default DropDown;