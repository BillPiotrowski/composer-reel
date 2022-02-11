import { animation, style, animate, trigger, transition, stagger, useAnimation, query, group, animateChild, sequence } from '@angular/animations';

const transitionTime = 300
export const transitionString = transitionTime + 'ms ease-out'


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
          animate(transitionString, style({ top: '0%' }))
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
          animate(transitionString, style({ top: '-100%' }))
        ]),
      query(':enter', animateChild()),
    ]),
    transition("* <=> *", [
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
        })
      ], {optional: true}),
      query(':enter', [
        style({
          left: '{{offsetEnter}}%',
        })
      ], {optional: true}),
      query(":self", [
    
        style({
          zIndex: '40',
        })
      ]),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate(transitionString, style({ left: '{{offsetLeave}}%' }))
        ], {optional: true}),
        query(':enter', [
          animate(transitionString, style({ left: '0%' }))
        ], {optional: true})
      ]),
      query(':enter', animateChild(), {optional: true}),
    ] ),
  ]);