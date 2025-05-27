// src/App.js
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Lenis from "lenis";
import AppRouter from "./Routes/AppRouter";
import store from "./Redux/Store/Store";
import { ToastContainer } from "react-toastify";

const App = () => {
  // useEffect(() => {
  //   const lensis = new Lenis();
  //   function raf(time) {
  //     lensis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);
  // }, []);
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  );
};

export default App;
