import React, { useCallback } from "react";
import styled from "styled-components";
import { ResolveItemProps, TypedResult } from "../../types";
import Icon from "@mdi/react";
import { mdiContentCopy } from "@mdi/js";
import { copyText, getAbbreviatedAddress } from "../../utils";
import { baseStyle } from "../../styles/baseStyle";
import { useRedefinedDomainResolverContext } from "../../context/RedefinedDomainResolverContext";

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
        <ItemWrapper onClick={() => onChange({ ...item, type: "resolve" })}>
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
                        {getAssetsByNetwork(item.network)?.name} from: <StyledSpan isRedefined={item.from.startsWith("redefined")}>
                            {item.from.startsWith("redefined") ? "redefined" : item.from}
                        </StyledSpan>
                    </StyledSubTitle>
                </div>
            </StyledContent>
            <div onClick={(e) => onCopyClick(e, item.address)}>
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
const StyledSpan = styled.span<{ isRedefined: boolean }>`
  ${({ isRedefined }) => isRedefined ? baseStyle.brandTextColor : null}
`;

export default ResolveItem;