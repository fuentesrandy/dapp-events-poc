//
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
//
import React from 'react';
import App from './components/App/App';
import store from './state/store'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider >
);


