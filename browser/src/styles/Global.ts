import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: none;
    }

    body, input, button {
        font-family: 'Roboto Slab', sans-serif;
        font-size: 16px;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    }

    body{
        background: #03002e;
        color: #fff;
        -webkit-font-smoothing: antialiased;
    }

    button {
        cursor: pointer;
    }
`;
