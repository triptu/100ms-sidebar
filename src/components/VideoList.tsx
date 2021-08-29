import {
  HMSPeer,
  HMSSpeaker,
  HMSTrack,
  HMSTrackID,
  selectPeers,
  selectSpeakers,
  selectTracksMap,
  useHMSStore,
} from '@100mslive/hms-video-react';
import { VideoTile } from './VideoTile';
import FlipMove from 'react-flip-move';

/**
 * 1. peer whose audio level is high gets higher priority
 * 2. peer whose video track is enabled gets higher priority
 */
function comparator(
  peer1: HMSPeer,
  peer2: HMSPeer,
  tracksMap: Record<HMSTrackID, HMSTrack>,
  speakers: Record<HMSTrackID, HMSSpeaker>
): number {
  const p1Enabled = peer1.videoTrack && tracksMap[peer1.videoTrack].enabled;
  const p2Enabled = peer2.videoTrack && tracksMap[peer2.videoTrack].enabled;
  let p1Audio = 0;
  let p2Audio = 0;
  if (peer1.audioTrack) {
    p1Audio = speakers[peer1.audioTrack]?.audioLevel || 0;
  }
  if (peer2.audioTrack) {
    p2Audio = speakers[peer2.audioTrack]?.audioLevel || 0;
  }
  const audioDiff = p2Audio - p1Audio;
  if (audioDiff !== 0) {
    return audioDiff;
  }
  if (p1Enabled && p2Enabled) {
    return 0;
  } else if (p1Enabled) {
    return -1;
  }
  return 1;
}

export function VideoList() {
  let peers = useHMSStore(selectPeers);
  const tracksMap = useHMSStore(selectTracksMap);
  const speakers = useHMSStore(selectSpeakers);
  peers = peers.filter((peer) => !peer.isLocal && peer.videoTrack);
  peers.sort((p1, p2) => comparator(p1, p2, tracksMap, speakers));

  return (
    <FlipMove>
      {peers.map((peer) => (
        <div key={peer.id} className={'videoTile'}>
          <VideoTile peer={peer} />
        </div>
      ))}
    </FlipMove>
  );
}
