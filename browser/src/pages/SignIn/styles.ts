import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import DoEnglishLogo from '../../assets/englandBackground.jpg';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 650px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Background = styled.div`
  display: flex;
  flex-direction: column;
  background: url(${DoEnglishLogo}) no-repeat center;
  background-size: cover;
  flex: 1;
  position: relative;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    background-color: black;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.2;
    z-index: -2;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  animation: ${appearFromLeft} 1.2s;

  img {
    margin: 0 auto;
  }

  form {
    /* margin: 5px 0; */
    width: 300px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: white;
      text-decoration: none;
      display: block;
      margin-top: 10px;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.3, 'white')};
      }
    }
  }

  > a {
    color: #fb3640;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    svg {
      margin-right: 10px;
    }

    &:hover {
      color: ${shade(0.3, '#fb3640')};
    }
  }
`;
