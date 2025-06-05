// src/App.js

import { Provider } from "react-redux";
import AppRouter from "./Routes/AppRouter";
import store from "./Redux/Store/Store";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    document.title = "Menoka-" + process.env.REACT_APP_DEV_ENV;
  }, []);
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
