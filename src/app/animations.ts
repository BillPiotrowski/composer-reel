import { animation, style, animate, trigger, transition, stagger, useAnimation, query, group, animateChild, sequence } from '@angular/animations';

import tracksJSON from './tracks.json'; 
// import { Track } from './app.component';
import { Track } from './playlist.service';
// const tracks = tracksJSON.tracks.map(x => <Track>x)


export const masterTracks = tracksJSON.tracks.map(x => <Track>x)

const leftToArray = masterTracks.map(x => "* => LeftTo" + x.url)
const leftToString = leftToArray.join(",")


const rightToArray = masterTracks.map(x => "* => RightTo" + x.url)
const rightToString = rightToArray.join(",")


const transToLeft = [
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: 0,
    })
  ]),
  query(':enter', [
    style({
      left: '100%',
    })
  ]),
  query(':leave', animateChild(), {optional: true}),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '-100%' }))
    ], {optional: true}),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%' }))
    ])
  ]),
  query(':enter', animateChild()),
]


const transToRight = [
  query(':enter, :leave', [
    style({
      position: 'absolute',
      top: 0,
      left: '0%',
    })
  ]),
  query(':enter', [
    style({
      left: '-100%',
    })
  ]),
  query(':leave', animateChild(), {optional: true}),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '100%' }))
    ], {optional: true}),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%' }))
    ])
  ]),
  query(':enter', animateChild()),
]


export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => Home', [
      query(':enter', [
        style({
          position: 'absolute',
          top: "-100%",
          left: 0,
          height: '100%',
          width: '100%',
        })
      ]),
      query(':leave', animateChild()),
        query(':enter', [
          animate('600ms ease-out', style({ top: '0%' }))
        ]),
      query(':enter', animateChild()),
    ]),
    transition('Home => *', [
      query(':leave', [
        style({
          position: 'absolute',
          top: "0",
          left: 0,
          height: '100%',
          width: '100%',
        })
      ]),
      query(':leave', animateChild()),
        query(':leave', [
          animate('600ms ease-out', style({ top: '-100%' }))
        ]),
      query(':enter', animateChild()),
    ]),
    transition(leftToString, transToLeft ),
    transition(rightToString, transToRight ),
  ]);