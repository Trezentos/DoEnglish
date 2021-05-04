import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  background: #212329;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  color: white;
  border: 2px solid #212329;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background-color: transparent;
    color: white;
  }

  svg {
    margin-right: 5px;
  }

  ${props =>
    props.isFocused &&
    css`
      color: #0061a8;
      border-color: white;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #0061a8;
    `}

  ${props =>
    props.isErrored &&
    css`
      border-color: #fb3640;
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 12px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
