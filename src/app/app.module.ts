import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouteReuseStrategy, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ActivatedRoute, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';
// Better way to pull from playlist??
import tracksJSON from './tracks.json'; 
// import { Track } from './app.component';
import { Track } from './playlist.service';
import { HomeComponent } from './home/home.component';
// const tracks = tracksJSON.tracks.map(x => <Track>x)


export const masterTracks = tracksJSON.tracks.map(x => <Track>x)

// Is parentheses required in definition?
const routes: ({
  path: string;
  component: typeof TrackComponent;
  data: {};
  redirectTo?: undefined;
  pathMatch?: undefined;
} | {
  path: string;
  redirectTo: string;
  pathMatch: string;
  component?: undefined;
  data?: undefined;
})[] = [
  { path: '', component: TrackComponent, data: {animation: 'FilterPage'}  }
]

const trackRoutes = tracksJSON.tracks.map(x => <Track>x).flatMap(x => [
  { path: x.url, component: TrackComponent, data: {animation: 'FilterPage'}  },
  { path: '',   redirectTo: '/'+x.url, pathMatch: 'full' },
])


// class CustomStrategy extends RouteReuseStrategy {
//   shouldDetach(route: ActivatedRouteSnapshot): boolean { return false; }
//   store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {}
//   shouldAttach(route: ActivatedRouteSnapshot): boolean { return false; }
//   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle|null { return null; }
//   shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
//     return false;
//   }
// }

@NgModule({
  declarations: [
    AppComponent,
    TrackComponent,
    HomeComponent,
  ],

// Important route / transition information
// Route reuse and using same component.
// https://github.com/angular/angular/issues/17349

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // RouterModule.forRoot(routes.concat(trackRoutes), {scrollPositionRestoration: 'enabled'}),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, data: {animation: 'Home'}  },
      // { path: '',   redirectTo: '/', pathMatch: 'full' },
      { path: 'grey-cardinal', component: TrackComponent, data: {animation: 'GreyCard'}  },
      { path: '',   redirectTo: '/grey-cardinal', pathMatch: 'full' },
      { path: 'lonesome-town', component: TrackComponent, data: {animation: 'Lonesome'}  },
      { path: '',   redirectTo: '/lonesome-town', pathMatch: 'full' },
      { path: 'the-lion-rises', component: TrackComponent, data: {animation: 'LionRises'}  },
      { path: '',   redirectTo: '/the-lion-rises', pathMatch: 'full' },
      { path: 'traintracks', component: TrackComponent, data: {animation: 'Traintracks'}  },
      { path: '',   redirectTo: '/traintracks', pathMatch: 'full' },

    ], {scrollPositionRestoration: 'enabled'}),
  ],
  providers: [/*{provide: RouteReuseStrategy, useClass: CustomStrategy}*/],
  bootstrap: [AppComponent]
})
export class AppModule { }





