import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: white;
  height: 56px;
  width: 100%;
  margin-top: 16px;
  border-radius: 10px;
  font-weight: 500;
  border: 2px solid #212329;
  color: #212329;
  padding: 0 16px;
  transition: background 0.2s;

  &:hover {
    background: ${shade(0.3, 'white')};
  }
`;
