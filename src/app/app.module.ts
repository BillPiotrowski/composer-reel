import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackComponent } from './track/track.component';

import tracksJSON from './tracks.json'; 
// import { Track } from './app.component';

// const tracks = tracksJSON.tracks.map(x => <Track>x)

@NgModule({
  declarations: [
    AppComponent,
    TrackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: TrackComponent, data: {/*animation: 'HomePage'*/}  },
      { path: 'grey-cardinal', component: TrackComponent, data: {/*animation: 'RepertoriumPage'*/}  },
      { path: '',   redirectTo: '/grey-cardinal', pathMatch: 'full' },
      { path: 'lonesome-town', component: TrackComponent, data: {/*animation: 'RepertoriumPage'*/}  },
      { path: '',   redirectTo: '/lonesome-town', pathMatch: 'full' },
      // { path: 'biography', component: BiographyComponent, data: {animation: 'BiographyPage'} },
      // { path: '',   redirectTo: '/biography', pathMatch: 'full' },
      // { path: 'correspond', component: ContactComponent, data: {animation: 'ContactPage'}  },
      // { path: '',   redirectTo: '/correspond', pathMatch: 'full' },
      // { path: 'grey-cardinal', component: GreyCardinalComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/grey-cardinal', pathMatch: 'full' },
      // { path: 'lonesome-town', component: LonesomeTownComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/lonesome-town', pathMatch: 'full' },
      // { path: 'you-cant-put-your-arms-around-a-memory', component: YouCantPutYourArmsComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/you-cant-put-your-arms-around-a-memory', pathMatch: 'full' },
      // { path: 'darklore-manor', component: DarkloreManorComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/darklore-manor', pathMatch: 'full' },
      // { path: 'necronomicon', component: NecronomiconComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/necronomicon', pathMatch: 'full' },
      // { path: 'winters-knight', component: WintersKnightComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/winters-knight', pathMatch: 'full' },
      // { path: 'transylvania', component: TransylvaniaComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/transylvania', pathMatch: 'full' },
      // { path: 'carnival-of-lost-souls', component: CarnivalOfLostSoulsComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/carnival-of-lost-souls', pathMatch: 'full' },
      // { path: 'blood-of-the-dragon', component: BloodOfTheDragonComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/blood-of-the-dragon', pathMatch: 'full' },
      // { path: 'blood-of-angels', component: BloodOfAngelsComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/blood-of-angels', pathMatch: 'full' },
      // { path: 'shadow-of-the-raven', component: ShadowOfTheRavenComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/shadow-of-the-raven', pathMatch: 'full' },
      // { path: 'grimm-tales', component: GrimmTalesComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/grimm-tales', pathMatch: 'full' },
      // { path: 'phantoms-of-the-high-seas', component: PhantomsOfTheHighSeasComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/phantoms-of-the-high-seas', pathMatch: 'full' },
      // { path: 'crimson-winter', component: CrimsonWinterComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/crimson-winter', pathMatch: 'full' },
      // { path: 'what-separates-us', component: WhatSeparatesUsComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/what-separates-us', pathMatch: 'full' },
      // { path: 'endless-night', component: EndlessNightComponent, data: {animation: 'MusicItemPage'} },
      // { path: '',   redirectTo: '/endless-night', pathMatch: 'full' },
      // { path: '**', component: PageNotFoundComponent  },  // Wildcard route for a 404 page
    ], {scrollPositionRestoration: 'enabled'}),
  ],
  providers: [{ provide: 'A', useValue: "hello"}],
  bootstrap: [AppComponent]
})
export class AppModule { }
