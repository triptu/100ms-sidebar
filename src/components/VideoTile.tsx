import { useEffect, useRef } from 'react';
import {
  HMSPeer,
  selectCameraStreamByPeerID,
  useHMSActions,
  useHMSStore,
} from '@100mslive/hms-video-react';
import { pageWidth } from '../utils/constants';
import { motion } from 'framer-motion';

export function VideoTile({ peer }: { peer: HMSPeer }) {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const track = useHMSStore(selectCameraStreamByPeerID(peer.id));

  useEffect(() => {
    if (videoRef.current && track) {
      if (track.enabled) {
        hmsActions.attachVideo(track.id, videoRef.current);
      } else {
        hmsActions.detachVideo(track.id, videoRef.current);
      }
    }
  }, [track, hmsActions]);

  if (!track) {
    return null;
  }
  return (
    <motion.div
      style={{ width: pageWidth }}
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ['20%', '20%', '50%', '50%', '20%'],
      }}
    >
      <video width={pageWidth} ref={videoRef} autoPlay muted playsInline />
    </motion.div>
  );
}
