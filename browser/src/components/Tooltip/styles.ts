import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    position: absolute;
    background: #c53030;
    padding: 8px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: white;

    &::before {
      border-style: solid;
      border-color: #c53030 transparent;
      border-width: 6px 6px 0 6px;
      content: '';
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    visibility: visible;
    opacity: 1;
    background: 'black';
  }
`;
