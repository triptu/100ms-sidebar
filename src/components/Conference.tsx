import { Notifications } from './Notifications';
import { VideoList } from './VideoList';
import { useEffect } from 'react';
import { useHMSActions } from '@100mslive/hms-video-react';

export function Conference() {
  const hmsActions = useHMSActions();

  useEffect(() => {
    return () => {
      hmsActions.leave().then();
    };
  }, [hmsActions]);

  return (
    <div className={'conference'}>
      <Notifications />
      <VideoList />
    </div>
  );
}
