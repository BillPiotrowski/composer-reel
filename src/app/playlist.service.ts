import { Injectable } from '@angular/core';

import tracksJSON from './tracks.json'; 
import { Track } from './app.component';

const tracks = tracksJSON.tracks.map(x => <Track>x) 

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public tracks = tracks
  private _currentTrackIndex: number = 0

  get currentTrackIndex(): number {
    return this._currentTrackIndex;
  }

  set currentTrackIndex(val: number) {
    this._currentTrackIndex = val
  }

  constructor() { }

  get nextTrackURL(): string | null {
    return getNextTrackURL(this.tracks, this.currentTrackIndex)
  }
  get prevTrackURL(): string | null {
    return getPrevTrackURL(this.tracks, this.currentTrackIndex)
  }

}





function getNextTrackURL(tracks: Track[], currentIndex: number): string | null {
  const nextTrack = getNextTrack(tracks, currentIndex)
  if (nextTrack != null){
    return nextTrack.url
  }
  return null
}


function getNextTrack(tracks: Track[], currentIndex: number): Track | null {
  const nextTrackIndex = getNextIndex(tracks, currentIndex);
  if (nextTrackIndex != null){
    return tracks[nextTrackIndex]
  } 
  return null
}

function getNextIndex(tracks: Track[], currentIndex: number) : number | null {
  const nextTrackIndex = currentIndex + 1;
  if(nextTrackIndex < tracks.length){
    return nextTrackIndex
  }
  return null
}




function getPrevTrackURL(tracks: Track[], currentIndex: number): string | null {
  const prevTrack = getPrevTrack(tracks, currentIndex)
  if (prevTrack != null){
    return prevTrack.url
  }
  return null
}


function getPrevTrack(tracks: Track[], currentIndex: number): Track | null {
  const prevTrackIndex = getPrevtIndex(tracks, currentIndex);
  if (prevTrackIndex != null){
    return tracks[prevTrackIndex]
  } 
  return null
}

function getPrevtIndex(tracks: Track[], currentIndex: number) : number | null {
  const prevTrackIndex = currentIndex - 1;
  if(prevTrackIndex > -1){
    return prevTrackIndex
  }
  return null
}