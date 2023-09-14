import React, { useCallback } from "react";
import styled from "styled-components";
import { ResolveItemProps } from "../../types";
import Icon from "@mdi/react";
import { mdiContentCopy } from "@mdi/js";
import { copyText, getAbbreviatedAddress } from "../../utils";
import { baseStyle } from "../../styles/baseStyle";
import { useRedefinedDomainResolverContext } from "../../context/RedefinedDomainResolverContext";
import Timeout from "../timeout/Timeout";
import moment from "moment";

const ResolveItem = (props: ResolveItemProps) => {
    const { item, onChange } = props;
    const { assets, hiddenAddressGap } = useRedefinedDomainResolverContext();

    const onCopyClick = (event: any, address: string) => {
        copyText(address);
        event.stopPropagation();
    }

    const getAssetsByNetwork = useCallback((network: string) => (
        assets?.find(it => it.key === network)
    ), [assets]);

    return (
        <ItemWrapper disabled={moment().diff(item.fetchedAt) > 60000} onClick={() => onChange({ ...item, type: "resolve" })}>
            <StyledContent>
                <StyledLogo
                    width={baseStyle.dropDown.logo.width}
                    src={getAssetsByNetwork(item.network)?.logo}
                    alt="coinLogo"
                />
                <div>
                    <StyledTitle>
                        {getAbbreviatedAddress(item.address, hiddenAddressGap?.leadingCharLimit, hiddenAddressGap?.trailingCharLimit)}
                    </StyledTitle>
                    <StyledSubTitle>
                        {getAssetsByNetwork(item.network)?.name} from: <StyledSpan isRedefined={item.vendor.startsWith("redefined")}>
                        {item.vendor.startsWith("redefined") ? "redefined" : item.vendor}
                    </StyledSpan>
                    </StyledSubTitle>
                </div>
            </StyledContent>
            {item && <StyledTimeout fetchedAt={item.fetchedAt}/>}
            <div style={{pointerEvents: "all"}} onClick={(e) => onCopyClick(e, item.address)}>
                <StyledIcon path={mdiContentCopy}/>
            </div>
        </ItemWrapper>
    )
}

const StyledTitle = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
`

const StyledSubTitle = styled.div`
  color: darkgrey;
  font-size: 12px;
`

const ItemWrapper = styled.div<{disabled: boolean}>`
  display: flex;
  padding: 5px 5px;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.disabled ? props.theme.colors.disabled : props.theme.colors.background};
  pointer-events: ${(props) => props.disabled && "none"};
  opacity: ${(props) => props.disabled ? 0.5 : 1};
  border-radius: ${baseStyle.input.borderRadius};

  :hover {
    background: ${(props) => !props.disabled && props.theme.colors.hover};
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

const StyledTimeout = styled(Timeout)`
  position: absolute;
  bottom: 2px;
  right: ${baseStyle.input.logo.padding};
`

const StyledSpan = styled.span<{ isRedefined: boolean }>`
  ${({ isRedefined }) => isRedefined ? baseStyle.brandTextColor : null}
`;

export default ResolveItem;
