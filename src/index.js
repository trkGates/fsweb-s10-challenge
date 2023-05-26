import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./store/reduxYapim";
import { Provider } from "react-redux";


const store = configureStore({
  reducer: myReducer,
});
 



const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <Provider store={store}>

  <BrowserRouter>
    <>
      <App />
    </>
  </BrowserRouter>
  </Provider>,
);
