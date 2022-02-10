import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private _videoPlayer?: HTMLVideoElement // = new HTMLVideoElement();
  private _timerVideoPlayer?: HTMLVideoElement

  set videoPlayer(val: HTMLVideoElement) {
    this._videoPlayer = val

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event
    val.addEventListener('play', (event) => {
      console.log('PLAYING VIDEO!!');
      this._timerVideoPlayer?.play()
    });
    val.addEventListener('pause', (event) => {
      console.log('PAUSING VIDEO!!');
      const timerVideoPlayer = this._timerVideoPlayer
      if (timerVideoPlayer){
        timerVideoPlayer.pause()
        timerVideoPlayer.currentTime = 0
      }
    });
  }


  set timerVideoPlayer(val: HTMLVideoElement){
    this._timerVideoPlayer = val
  }
  constructor() { }
}
