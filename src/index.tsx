import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { HMSRoomProvider } from '@100mslive/hms-video-react';
import { pageWidth } from './utils/constants';

const isDev = process.env.NODE_ENV === 'development';

ReactDOM.render(
  <React.StrictMode>
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
if (isDev) {
  serviceWorkerRegistration.unregister();
} else {
  serviceWorkerRegistration.register();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// eslint-disable-next-line no-restricted-globals
window.resizeTo(pageWidth+10, screen.height);
