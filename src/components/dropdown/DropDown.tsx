import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { DropDownProps } from "../../types";
import { getErrorMessage } from "../../utils";
import { baseStyle } from "../../styles/baseStyle";
import ResolveItem from "../item-card/ResolveItem";
import ReverseItem from "../item-card/ReverseItem";
import { useRedefinedDomainResolverContext } from "../../context/RedefinedDomainResolverContext";
import moment from "moment";

const DropDown = (props: DropDownProps) => {
    const {
        active,
        resolveContent,
        reverseContent,
        error,
        onChange,
        onClickOutside
    } = props;

    const { type } = useRedefinedDomainResolverContext();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node) && onClickOutside) {
                onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [onClickOutside]);

    const noFoundMessages = {
        resolve: "No addresses found",
        reverse: "No domains found"
    };

    return active ? (
        <StyledDropDown className="dropdown" ref={ref}>
            {resolveContent.length || reverseContent.length ? (
                <UnorderedList>
                    {resolveContent
                        .sort((a, b) => a.network?.localeCompare(b.network) || 0)
                        .map((item, key) => (
                            <ListItem disabled={moment().diff(item.fetchedAt) > 60000} key={key}>
                                <ResolveItem
                                    item={item}
                                    onChange={onChange}
                                />
                            </ListItem>
                        ))}
                    {reverseContent.map((item, key) => (
                        <ListItem disabled={moment().diff(item.fetchedAt) > 60000} key={key}>
                            <ReverseItem item={item} onChange={onChange}/>
                        </ListItem>
                    ))}
                </UnorderedList>
            ) : null}
            {!error && !(resolveContent.length || reverseContent.length) ? (
                <StyledNotFoundMessage>{noFoundMessages[type] || "No addresses or domains found"}</StyledNotFoundMessage>
            ) : null}
            {error ? <StyledErrorMessage>{getErrorMessage(error)}</StyledErrorMessage> : null}
        </StyledDropDown>
    ) : null;
};

const StyledDropDown = styled.div`
  position: absolute;
  width: calc(100% - 2 * ${baseStyle.input.borderWidth});
  border-bottom-left-radius: ${baseStyle.input.borderRadius};
  border-bottom-right-radius: ${baseStyle.input.borderRadius};
  border-bottom: ${baseStyle.input.borderWidth} solid ${({ theme }) => theme.colors.borderColor};
  border-left: ${baseStyle.input.borderWidth} solid ${({ theme }) => theme.colors.borderColor};
  border-right: ${baseStyle.input.borderWidth} solid ${({ theme }) => theme.colors.borderColor};
  background: ${({ theme }) => theme.colors.background};
  transition: 0.5s ease all;
  overflow: hidden;
`;

const UnorderedList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 10px 0;
  max-height: 30vh;
  overflow: auto;
`;

const ListItem = styled.li<{disabled: boolean}>`
  font-weight: 300;
  pointer-events: ${(props) => props.disabled && "none"};
  opacity: ${(props) => props.disabled ? 0.5 : 1};
  padding: 0 17px;

  :hover {
    background: ${(props) => !props.disabled && props.theme.colors.hover};
    cursor: pointer;
  }
`;

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

export default DropDown;
