import styled from "styled-components";
import React from "react";

const StyledProgress = styled.div`
  background-color: white;
  height: 2px;
  width: calc(100% - 16px);
  margin-left: 8px;
  position: absolute;
  bottom: 1px;
  left: 0;
  z-index: 10;
  border-radius: 2px;
  overflow: hidden;

  .indeterminate {
    background-color: #faab1e;
    box-shadow: 0 0 10px #faab1e, 0 0 5px #faab1e;

    &:before {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
    }

    &:after {
      content: '';
      position: absolute;
      background-color: inherit;
      top: 0;
      left: 0;
      bottom: 0;
      will-change: left, right;
      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
    }
  }

  @keyframes indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  @keyframes indeterminate-short {
    0% {
      left: -200%;
      right: 100%;
    }
    60% {
      left: 107%;
      right: -8%;
    }
    100% {
      left: 107%;
      right: -8%;
    }
  }
`

export const Progress = () => (
  <StyledProgress>
    <div className='indeterminate' />
  </StyledProgress>
)