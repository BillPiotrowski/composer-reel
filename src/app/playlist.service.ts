import { Injectable } from '@angular/core';

import tracksJSON from './tracks.json'; 

const tracks = tracksJSON.tracks.map(x => <Track>x) 

export interface Track {
  title: string;
  url: string;
  // role: string[]
  // department_id: number;
  // permissions_id: number;
  // maxWorkHours: number;
  // employee_id: number;
  // firstname: string;
  // lastname: string;
  // username: string;
  // birthdate: Date;
  // lastUpdate: Date;
}

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
    this.setNextPrev();
  }
  private _isNextTrackEnabled: boolean
  private _isPrevTrackEnabled: boolean

  get isNextTrackEnabled(): boolean { return this._isNextTrackEnabled}
  get isPrevTrackEnabled(): boolean { return this._isPrevTrackEnabled}

  constructor() {
    this._isNextTrackEnabled = getNextTrack(tracks, 0) != null
    this._isPrevTrackEnabled = getPrevTrack(tracks, 0) != null
  }


  setNextPrev() {
    // const nextURL = this.playlistService.nextTrackURL;
    // const prevURL = this.playlistService.prevTrackURL;

    // this.nextURL = nextURL
    // this.prevURL = prevURL
    this._isNextTrackEnabled = this.nextTrackURL != null;
    this._isPrevTrackEnabled = this.prevTrackURL != null;
    
  }


  get nextTrackURL(): string | null {
    return getNextTrackURL(this.tracks, this._currentTrackIndex)
  }
  get prevTrackURL(): string | null {
    return getPrevTrackURL(this.tracks, this._currentTrackIndex)
  }
  get nextTrack(): Track | null {
    return getNextTrack(this.tracks, this._currentTrackIndex)
  }
  get prevTrack(): Track | null {
    return getPrevTrack(this.tracks, this._currentTrackIndex)
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