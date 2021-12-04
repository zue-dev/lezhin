import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
    }

    * {
        box-sizing: border-box;
    }

    body {
        background-color: #e6e6e6;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 0;
    }

    button {
        border-style: none;
    }
`;

export default GlobalStyle;
