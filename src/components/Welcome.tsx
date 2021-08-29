import { useEffect, useState } from 'react';
import { Button } from 'antd';

export function Welcome() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
    });
  }, []);

  const install = async () => {
    if (installPrompt) {
      setIsInstalling(true);
      (installPrompt as any).prompt();
      setIsInstalling(false);
    }
  };

  let text;
  let imgSrc;
  if (installPrompt) {
    text = 'Please install this app to use it.';
  } else {
    // @ts-ignore
    if (navigator.getInstalledRelatedApps) {
      text = 'Please open the installed app.';
      imgSrc = './pwa.png';
    } else {
      text = 'This browser is not supported, please use Chrome.';
    }
  }

  return (
    <div className={'welcome'}>
      <h3>{text}</h3>
      <div>{imgSrc && <img src={imgSrc} alt={'pwa'} />}</div>
      {installPrompt && (
        <Button
          type={'primary'}
          size={'large'}
          disabled={isInstalling}
          onClick={install}
        >
          Install the app
        </Button>
      )}
    </div>
  );
}
