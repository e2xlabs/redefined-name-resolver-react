import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { DropDownProps } from "../../types";
import { getErrorMessage } from "../../utils";
import ReactLoading from "react-loading";
import { baseStyle } from "../../styles/baseStyle";
import ResolveItem from "../item-card/ResolveItem";
import ReverseItem from "../item-card/ReverseItem";

const DropDown = (props: DropDownProps) => {
    const {
        type,
        active,
        resolveContent,
        reverseContent,
        loading,
        error,
        assets,
        onChange,
        onClickOutside
    } = props;
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

    const noFoundMsg = useMemo(() => {
        switch (type) {
            case "resolve":
                return "No addresses found";
            case "reverse":
                return "No domains found"
            case "combined":
                return "No addresses or domains found"
        }
        return "";
    }, [type])

    return active ? (
        <DropDownWrapper ref={ref} data-testid="dropdown">
            {loading ?
                <StyledLoader
                    data-testid="loader"
                    type="spinningBubbles"
                    color={baseStyle.brandColor}
                    height={baseStyle.loader.height}
                    width={baseStyle.loader.height}
                /> : null
            }
            {!loading && (resolveContent.length || reverseContent.length) ?
                <UnorderedList>
                    {resolveContent.sort((a, b) => a.network?.localeCompare(b.network)).map((item, key) => (
                        <ListItem key={key}>
                            <ResolveItem item={item} assets={assets} onChange={onChange}/>
                        </ListItem>
                    ))}
                    {reverseContent.map((item, key) => (
                        <ListItem key={key}>
                            <ReverseItem item={item} onChange={onChange}/>
                        </ListItem>
                    ))}
                </UnorderedList> : null
            }
            {!loading && !error && !(resolveContent.length || reverseContent.length) ?
                <StyledNotFoundMessage>{noFoundMsg}</StyledNotFoundMessage> : null
            }
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

export default DropDown;