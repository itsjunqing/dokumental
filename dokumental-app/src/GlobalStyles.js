import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-family: Helvetica, Sans-Serif;
    color: white;
    text-decoration: none;
    box-sizing: border-box;
  }
  
  body{
    background: #212121;
  }

  ul {
    list-style-type: none;
  }

  button{
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  }

  h1{
    font-size: 36px;
  }

  @media (max-width: 550px){
    * {
      font-size: 15px;
    }
  }

  @media (max-width: 425px){
    * {
      font-size: 10px;
    }
    .logo{
      width: 40px;
      height: 40px;
    }
  }
`;

export default GlobalStyle;
