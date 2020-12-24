import React from "react";
import { ThemeProvider } from "styled-components";
import AppRouter from "./router";
import GlobalStyles from "./GlobalStyles";
import theme from "./Theme";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppRouter />
        <GlobalStyles />
      </ThemeProvider>
    </div>
  );
};

export default App;
