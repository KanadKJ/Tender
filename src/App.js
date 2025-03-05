// src/App.js
import React from "react";
import { Provider } from "react-redux";

import AppRouter from "./Routes/AppRouter";
import store from "./Redux/Store/Store";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
