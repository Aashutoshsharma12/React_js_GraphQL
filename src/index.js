// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import Login from './component/Auth/SignIn';
// import Profile from './component/Auth/profile';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//     {/* <Login/>
//     <Profile/> */}
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
import { StrictMode } from "react";
import ReactDOM from "react-dom"
import App from "./App"
// import { BrowserRouter as Router } from "react-router-dom"

const rootElement = document.getElementById("root")
ReactDOM.render(
  <StrictMode>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </StrictMode>,
  rootElement
);  