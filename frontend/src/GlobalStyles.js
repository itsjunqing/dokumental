import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: 'Helvetica', sans-serif !important;
    text-decoration: none;
    box-sizing: border-box;
    font-size: 14px;
    @media(min-width: 960px){
      font-size: 16px;
    }
  }
  
  body{
    background: #212121;
    color: white;
  }
  h1{
    margin: 0;
    font-size: 7vw;
    font-weight: normal;
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

  .logo, .icon{
    width: 12vw;
    height: 12vw;
  }

  // Max Size for screens larger than 450px
  @media (min-width: 450px) { 
    *{
      font-size: 20px;
    }
    h1{
      font-size: 36px;
    }
    .icon{
      width: 60px;
      height: 60px;
    }
    .logo{
      width: 40px;
      height: 40px;
    }
  }

`;

export default GlobalStyle;
