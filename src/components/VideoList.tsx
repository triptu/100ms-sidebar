import {
  selectPeers,
  useHMSStore,
  VideoTile,
} from '@100mslive/hms-video-react';

export function VideoList() {
  const peers = useHMSStore(selectPeers);

  return (
    <>
      {peers.map((peer) => {
        return (
          <div className={'videoTile'}>
            <VideoTile peer={peer} objectFit={'contain'} />
          </div>
        );
      })}
    </>
  );
}
