import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import BigBangBackground from '../../assets/BigBangBackground.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Background = styled.div`
  flex: 1;
  background: url(${BigBangBackground}) no-repeat center;
  background-position: center;
  background-size: cover;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const appearFromRight = keyframes`

from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }

`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    /* margin: 10px 0; */
    width: 320px;
    text-align: center;

    h1 {
      margin-bottom: 10px;
    }
  }
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #fb3640;
    margin-top: 10px;

    &:hover {
      color: ${shade(0.35, '#fb3640')};
    }

    svg {
      margin-right: 3px;
    }
  }
`;
