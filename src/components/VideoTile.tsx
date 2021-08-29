import React, { useEffect, useRef } from 'react';
import {
  HMSPeer,
  selectCameraStreamByPeerID,
  useHMSActions,
  useHMSStore,
} from '@100mslive/hms-video-react';
import { pageWidth } from '../utils/constants';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function VideoTileBare({ peer }: { peer: HMSPeer }) {
  const videoRef = useRef(null);
  const hmsActions = useHMSActions();
  const track = useHMSStore(selectCameraStreamByPeerID(peer.id));
  const [inViewRef, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (videoRef.current && track) {
      if (inView && track.enabled) {
        hmsActions.attachVideo(track.id, videoRef.current);
      } else {
        hmsActions.detachVideo(track.id, videoRef.current);
      }
    }
  }, [track, hmsActions, inView]);

  if (!track) {
    return null;
  }
  return (
    <motion.div
      style={{ width: pageWidth, position: 'relative' }}
      animate={{ scale: [0.5, 1], opacity: 1 }}
      transition={{ duration: 0.5 }}
      exit={{ scale: [1, 0.5], opacity: 0 }}
      ref={inViewRef}
    >
      <video
        style={{ position: 'relative', zIndex: 0 }}
        width={pageWidth}
        ref={videoRef}
        autoPlay
        muted
        playsInline
      />
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }}>
        <p style={{ color: 'black', fontSize: 20 }}>{peer.name}</p>
      </div>
    </motion.div>
  );
}

export const VideoTile = React.memo(VideoTileBare);
