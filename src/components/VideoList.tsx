import { selectPeers, useHMSStore } from '@100mslive/hms-video-react';
import { VideoTile } from './VideoTile';

export function VideoList() {
  const peers = useHMSStore(selectPeers);

  return (
    <>
      {peers.map((peer) => {
        console.log('rendering peer ', peer);
        return (
          peer.videoTrack &&
          !peer.isLocal && (
            <div key={peer.id} className={'videoTile'}>
              <VideoTile peer={peer} />
            </div>
          )
        );
      })}
    </>
  );
}
