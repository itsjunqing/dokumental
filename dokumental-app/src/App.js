import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import AppRouter from "./router";
import GlobalStyles from "./GlobalStyles";
import theme from "./Theme";
import store from "./store";

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppRouter />
        </Provider>
        <GlobalStyles />
      </ThemeProvider>
    </div>
  );
};

export default App;
