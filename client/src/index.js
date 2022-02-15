import React from 'react';
import ReactDOM from 'react-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';
import App from './App';
import Context from "./components/Context";


ReactDOM.render(
  <React.StrictMode>
    <Context>
    <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
);
