import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
// import { Track } from '../app.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FilterableTrack, Track } from '../playlist/track';

import { PlaylistService } from '../playlist/playlist.service';
import { MediaService } from '../media/media.service';


@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayerRef!: ElementRef;
  
  track: FilterableTrack

  public constructor(
    private playlistService: PlaylistService,
    private router:Router/*, private route:ActivatedRoute, */,
    private mediaService: MediaService
  ){
    // console.log(route.snapshot.data['test']);
    // console.log(router.url)
    // const tracks: Track[] = route.snapshot.data['test'];
    const track = playlistService.tracks.find((x) => { 
      return ('/' + x.url) == router.url
    } )
    // I Don't like forcing this. Should throw an error!
    this.track = track!
    console.log(track)
}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.mediaService.videoPlayer = this.videoPlayerRef.nativeElement
  }

}
