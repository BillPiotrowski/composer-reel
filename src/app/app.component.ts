import { Component, Injectable } from '@angular/core';
import { Router, Event, NavigationStart, RouterOutlet, ActivationEnd, ActivationStart, NavigationEnd } from '@angular/router';
import { Injector } from '@angular/core';
import { PlaylistService } from './playlist.service';

// import tracksJSON from './tracks.json'; 

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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'composer-reel';
  masterTracks: Track[]
  // currentTrackIndex: number
  nextURL: string | null
  isNextEnabled: boolean
  prevURL: string | null
  isPrevEnabled: boolean

  constructor(
    private router: Router,
    private injector: Injector,
    private playlistService: PlaylistService
  ) { 

  const A = this.injector.get('A');
  console.log(A);



    const masterTracks = playlistService.tracks
        if (this.router.url === "/") {
          this.router.navigate([masterTracks[0].url])
          // this.router.navigate(['grey-cardinal']);
        } else {
          // GET TRACK INDEX OF URL!!!!

        }

    const nextTrackURL = playlistService.nextTrackURL;
    const prevTrackURL = playlistService.prevTrackURL;
    const isNextEnabled = nextTrackURL != null;
    const isPRevEnabled = prevTrackURL != null;

    this.masterTracks = masterTracks;
    // this.currentTrackIndex = 0;
    
    this.nextURL = nextTrackURL;
    this.prevURL = prevTrackURL;
    this.isNextEnabled = isNextEnabled;
    this.isPrevEnabled = isPRevEnabled;

    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        const newIndex = this.masterTracks.findIndex((x) => { 
          return ('/' + x.url) == e.url 
        } )
        if (newIndex > -1){
          this.playlistService.currentTrackIndex = newIndex
          // this.currentTrackIndex = newIndex;
          this.setNextPrev();
        }

      }
    })

  }



  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }

  setNextPrev() {
    const nextURL = this.playlistService.nextTrackURL;
    const prevURL = this.playlistService.prevTrackURL;

    this.nextURL = nextURL
    this.prevURL = prevURL
    this.isNextEnabled = nextURL != null;
    this.isPrevEnabled = prevURL != null;
    
  }

}
