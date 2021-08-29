import {
  HMSNotificationTypes,
  useHMSNotifications,
} from '@100mslive/hms-video-react';
import { notification as notify } from 'antd';
import { useEffect } from 'react';

export function Notifications() {
  const notification = useHMSNotifications();

  const showInfo = (msg: string) => {
    notify.info({
      message: msg,
      duration: 2,
    });
  };

  useEffect(() => {
    if (notification?.type === 'error') {
      const args = {
        message: 'Error!!',
        description: notification.data?.message,
        duration: 3,
      };
      notify.error(args);
    } else {
      switch (notification?.type) {
        case HMSNotificationTypes.PEER_JOINED:
          showInfo(`${notification.data.name} joined the room`);
          break;
        case HMSNotificationTypes.PEER_LEFT:
          showInfo(`${notification.data.name} left the room`);
          break;
      }
    }
  }, [notification]);

  return null;
}
