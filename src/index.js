import React from 'react';
import ReactDOM from 'react-dom/client';
import "./Home.css"
import { RecoilRoot } from 'recoil';
import Router from './Router';
import App from './App';





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RecoilRoot>
    <React.StrictMode>
      <Router/>
    </React.StrictMode>
  </RecoilRoot>
 
);


