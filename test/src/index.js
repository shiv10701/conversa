import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reduce from './components/reducers/reducer';
import AssignUserData from './components/local_storage_function';
import { SocketContextProvider } from './socket/socketConnection';
import { FontProvider } from './utils/fonts';

const store=createStore(reduce);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
    <AssignUserData />
      <SocketContextProvider>
        <FontProvider>
        <App />
        </FontProvider>
      </SocketContextProvider>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
