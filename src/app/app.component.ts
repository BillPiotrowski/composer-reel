import { Component, Injectable } from '@angular/core';
import { Router, Event, NavigationStart, RouterOutlet, ActivationEnd, ActivationStart, NavigationEnd } from '@angular/router';
import { Injector } from '@angular/core';
import { PlaylistService } from './playlist.service';

// import tracksJSON from './tracks.json'; 

import { Track } from './playlist.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  title = 'composer-reel';
  masterTracks: Track[]
  

  constructor(
    private router: Router,
    private injector: Injector,
    public playlistService: PlaylistService
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


    this.masterTracks = masterTracks;
    // this.currentTrackIndex = 0;
    

    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        const newIndex = this.masterTracks.findIndex((x) => { 
          return ('/' + x.url) == e.url 
        } )
        if (newIndex > -1){
          this.playlistService.currentTrackIndex = newIndex
          // this.currentTrackIndex = newIndex;
          // this.setNextPrev();
        }

      }
    })

  }



  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }


}
