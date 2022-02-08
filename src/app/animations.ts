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
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '-100%' }))
    ]),
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
  query(':leave', animateChild()),
  group([
    query(':leave', [
      animate('300ms ease-out', style({ left: '100%' }))
    ]),
    query(':enter', [
      animate('300ms ease-out', style({ left: '0%' }))
    ])
  ]),
  query(':enter', animateChild()),
]


export const slideInAnimation =
  trigger('routeAnimations', [
    transition(leftToString, transToLeft ),
    transition(rightToString, transToRight ),
    transition('* => *', [
      style({ position: 'absolute' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: '1200px',
          left: 0,
          width: '100%',
          opacity: 0,
          background: 'yellow'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('3000ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('3000ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    // transition('* <=> FilterPage', [
    //   style({ position: 'relative' }),
    //   query(':enter, :leave', [
    //     style({
    //       position: 'absolute',
    //       top: 0,
    //       left: 0,
    //       width: '100%'
    //     })
    //   ]),
    //   query(':enter', [
    //     style({ left: '-100%' })
    //   ]),
    //   query(':leave', animateChild()),
    //   group([
    //     query(':leave', [
    //       animate('200ms ease-out', style({ left: '100%' }))
    //     ]),
    //     query(':enter', [
    //       animate('300ms ease-out', style({ left: '0%' }))
    //     ])
    //   ]),
    //   query(':enter', animateChild()),
    // ])
  ]);