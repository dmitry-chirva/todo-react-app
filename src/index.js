import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {StatusNames} from "./shared/enum/status-names.enum";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<App status={StatusNames.ALL}/>}/>
            <Route path="/active" element={<App status={StatusNames.ACTIVE}/>}/>
            <Route path="/completed" element={<App status={StatusNames.COMPLETED}/>}/>
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
