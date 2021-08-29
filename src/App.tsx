import React, { useEffect, useState } from 'react';
import './App.css';
import { Welcome } from './components/Welcome';
import {
  selectIsConnectedToRoom,
  useHMSStore,
} from '@100mslive/hms-video-react';
import { Conference } from './components/Conference';
import { Join } from './components/Join';
import { pageWidth } from './utils/constants';

function checkPWA() {
  return window.matchMedia('(display-mode: standalone)').matches;
}
const initialCheck = checkPWA();
const isDev = process.env.NODE_ENV === 'development';

function App() {
  const [isOpenAsPWA, setIsOpenAsPWA] = useState(initialCheck);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  console.log('opened app', isOpenAsPWA, isConnected);

  useEffect(() => {
    window.addEventListener('appinstalled', () => {
      setIsOpenAsPWA(checkPWA());
      // eslint-disable-next-line no-restricted-globals
      window.resizeTo(pageWidth, screen.height);
    });
    window
      .matchMedia('(display-mode: standalone)')
      .addEventListener('change', (evt) => {
        setIsOpenAsPWA(evt.matches);
        if (evt.matches) {
          // eslint-disable-next-line no-restricted-globals
          window.resizeTo(pageWidth, screen.height);
        }
      });
  }, []);

  return (
    <div className="App">
      {isConnected ? (
        <Conference />
      ) : isOpenAsPWA || isDev ? (
        <Join />
      ) : (
        <Welcome />
      )}
    </div>
  );
}

export default App;
