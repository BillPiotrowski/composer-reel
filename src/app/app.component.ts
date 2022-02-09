import { Component, Injectable, ElementRef, QueryList, ViewChild, ViewChildren, NgModule, VERSION } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  
  // ...
} from '@angular/animations';
import {BrowserModule} from '@angular/platform-browser'
// import { GlobalNavComponent } from './global-nav/global-nav.component';
import { Router, RouteReuseStrategy, Event, NavigationStart, RouterOutlet, ActivationEnd, ActivationStart, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './animations'
import { ActivatedRoute, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
// import { AudioService } from './audio.service';
// import { VideoService } from './video.service';
// import assetURLS from './asset-urls.json'; 

// import { Component, Injectable } from '@angular/core';
// import { Router, Event, NavigationStart, RouterOutlet, ActivationEnd, ActivationStart, NavigationEnd } from '@angular/router';
import { Injector } from '@angular/core';
import { PlaylistService } from './playlist.service';

// import { animation, style, animate, trigger, transition, stagger, useAnimation, query, group, animateChild, sequence } from '@angular/animations';
// import { slideInAnimation } from './animations';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import * from '@angular/animations'

// import tracksJSON from './tracks.json'; 

import { Track } from './playlist.service';
import { animation, stagger, useAnimation, query, group, animateChild, sequence } from '@angular/animations';






// export const slideInAnimation =
//   trigger('routeAnimations', [
//     transition('HomePage <=> AboutPage', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
//         style({ left: '-100%' })
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('300ms ease-out', style({ left: '100%' }))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%' }))
//         ])
//       ]),
//       query(':enter', animateChild()),
//     ]),
//     transition('* <=> FilterPage', [
//       style({ position: 'relative' }),
//       query(':enter, :leave', [
//         style({
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%'
//         })
//       ]),
//       query(':enter', [
//         style({ left: '-100%' })
//       ]),
//       query(':leave', animateChild()),
//       group([
//         query(':leave', [
//           animate('200ms ease-out', style({ left: '100%' }))
//         ]),
//         query(':enter', [
//           animate('300ms ease-out', style({ left: '0%' }))
//         ])
//       ]),
//       query(':enter', animateChild()),
//     ])
//   ]);





// const fadeIn = [
//   query(':leave', style({ position: 'absolute', left: 0, right: 0, opacity: 1 })),
//   query(':enter', style({ position: 'absolute', left: 0, right: 0, opacity: 0 })),
//   query(':leave', animate('1s', style({ opacity: 0 }))),
//   query(':enter', animate('1s', style({ opacity: 1 })))
// ]


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation,

    trigger('openClose', [
      // ...
      state('open', style({
        top: '0%',
        // height: '200px',
        // opacity: 1,
        // backgroundColor: 'yellow'
      })),
      state('closed', style({
        top: '-100%',
        // height: '100px',
        // opacity: 0.8,
        // backgroundColor: 'blue'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ])
    // trigger('routeAnimations', [
    //   transition('* => LeftToTrack', fadeIn),
    //   transition('TrackPage => Home', fadeIn)
    // ])
  ]
})



export class AppComponent {
  title = 'composer-reel';
  masterTracks: Track[]
  isOpen = false;

  constructor(
    private router: Router,
    // private injector: Injector,
    public playlistService: PlaylistService

  ) { 

  // const A = this.injector.get('A');
  // console.log(A);



    const masterTracks = playlistService.tracks
        if (this.router.url === "/") {
          // this.router.navigate([masterTracks[0].url])
          // this.router.navigate(['grey-cardinal']);
        } else {
          // GET TRACK INDEX OF URL!!!!

        }


    this.masterTracks = masterTracks;
    // this.currentTrackIndex = 0;
    

    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationStart) {
        // if (this.isOpen) { this.isOpen = false }
        console.log("NEW TRACK:")
        console.log(e.url)
        const trackURL = this.playlistService.tracks.find(
          x => { 
            console.log(x.url);
            return ('/' + x.url) == e.url
          }
        )
        if (trackURL){
          console.log("MATCH?")
          console.log(trackURL)
          this.playlistService.newURL(trackURL);
        }
        // const newIndex = this.playlistService.visibleTracks.findIndex((x) => { 
        //   return ('/' + x.url) == e.url 
        // } )
        // if (newIndex > -1){
        //   console.log("NEW INDEX!!!!")
        //   this.playlistService.currentTrackIndex = newIndex
        //   // this.currentTrackIndex = newIndex;
        //   // this.setNextPrev();
        // }

      }
    })

  }


  toggleHome(){
    this.isOpen = !this.isOpen
    // if (!this.isOpen && )
  }
  // prepareRouteTransition(outlet: RouterOutlet): string | null {
  //   try {
  //     return outlet.activatedRoute.params.value.pageId || '';
  //   } catch(e) {
  //     return '';
  //   }
	// }

  prepareRoute(outlet: RouterOutlet) {
    const explicitAnimation = outlet?.activatedRouteData?.['animation']
    if (explicitAnimation != null) {
      return explicitAnimation
    }

    const previousTrackIndex = this.playlistService.previousTrackIndex
    if (previousTrackIndex != null){
      if (this.playlistService.currentTrackIndex > previousTrackIndex) {
        const trans = "LeftTo" + this.playlistService.tracks[this.playlistService.currentTrackIndex].url
        console.log(trans)
        return trans
      } else {

        const trans = "RightTo" + this.playlistService.tracks[this.playlistService.currentTrackIndex].url
        console.log(trans)
        return trans
      }
    }
    // console.log("prepping route to!");
    // console.log(outlet?.activatedRouteData?.['animation'])
    // console.log("from:")
    // console.log(this.playlistService.tracks[this.playlistService.currentTrackIndex].title)
    return outlet?.activatedRouteData?.['animation'];
  }

  // prepareRoute(outlet: RouterOutlet) {
  //   return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  // }

}




