import React, {useCallback, useEffect, useRef} from "react";
import styled from "styled-components";
import {DropdownProps} from "../../types";
import Icon from "@mdi/react";
import {mdiContentCopy} from "@mdi/js";
import {copyText, getAbbreviatedAddress, getErrorMessage} from "../../utils";
import ReactLoading from "react-loading";
import {baseStyle} from "../../styles/baseStyle";

const DropDown = (props: DropdownProps) => {
  const {active, content, loading, error, assets, hiddenAddressGap, onChange, onClickOutside} = props;
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

  const onCopyClick = (event: any, address: string) => {
    copyText(address);
    event.stopPropagation();
  }

  return active ? (
    <DropDownWrapper ref={ref} data-testid="dropdown">
      {loading ? <StyledLoader data-testid="loader" type="spinningBubbles" color={baseStyle.brandColor} height={baseStyle.loader.height} width={baseStyle.loader.height}/> : null}
      {!loading && content.length > 0 ? <UnorderedList>
        {content.sort((a, b) => a.network.localeCompare(b.network)).map((item, key) => (
          <ListItem key={key}>
            <ItemWrapper onClick={() => onChange(item)}>
              <StyledContent>
                <StyledLogo width={baseStyle.dropDown.logo.width} src={assets?.[item.network]?.logo} alt="coinLogo"/>
                <div>
                  <StyledTitle>{getAbbreviatedAddress(item.address, hiddenAddressGap?.leadingCharLimit, hiddenAddressGap?.trailingCharLimit)}</StyledTitle>
                  <StyledSubTitle>{assets?.[item.network]?.name} from: <StyledSpan isRedefined={item.from.startsWith("redefined")}>{item.from.startsWith("redefined") ? "redefined" : item.from}</StyledSpan></StyledSubTitle>
                </div>
              </StyledContent>
              <div onClick={(e) => onCopyClick(e, item.address)}>
                <StyledIcon path={mdiContentCopy}/>
              </div>
            </ItemWrapper>
          </ListItem>
          ))
        }
      </UnorderedList> : null}
      {!loading && !error && content.length == 0 ? <StyledNotFoundMessage>No addresses found</StyledNotFoundMessage> : null}
      {error ? <StyledErrorMessage>{getErrorMessage(error)}</StyledErrorMessage> : null}
    </DropDownWrapper>
  ) : null;
}

const DropDownWrapper = styled.div`
  position: absolute;
  width: calc(100% - 2 * ${baseStyle.input.borderWidth});
  border-bottom-left-radius: ${baseStyle.input.borderRadius};
  border-bottom-right-radius: ${baseStyle.input.borderRadius};
  border-bottom: ${baseStyle.input.borderWidth} solid ${({ theme }) => theme.colors.borderColor};
  border-left: ${baseStyle.input.borderWidth} solid ${({ theme }) => theme.colors.borderColor};
  border-right: ${baseStyle.input.borderWidth} solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.background};
  transition: 0.5s ease all;
`

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 5px 5px;
  max-height: 30vh;
  overflow: auto;
`

const ListItem = styled.li`
  font-weight: 300;
`

const StyledTitle = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`

const StyledSubTitle = styled.div`
  color: darkgrey;
  font-size: 12px;
`

const ItemWrapper = styled.div`
  display: flex;
  padding: 5px 5px;
  justify-content: space-between;
  align-items: center;
  :hover {
    background: ${({ theme }) => theme.colors.hover};
    border-radius: ${baseStyle.input.borderRadius};
    cursor: pointer;
  }
`

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLogo = styled.img`
  margin-right: 10px;
  background: white;
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
`;

const StyledSpan = styled.span<{isRedefined: boolean}>`
  ${({isRedefined}) => isRedefined ? baseStyle.brandTextColor : null}
`;

export default DropDown;