import { Component, OnInit } from '@angular/core';
import { PlaylistService, tagFilters } from '../playlist/playlist.service';
import { Output, Input, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() toggleVideoEvent = new EventEmitter<void>();

  constructor(
    public playlistService: PlaylistService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
  }

  toggleContainer(){
    this.toggleVideoEvent.emit()
  }

  close(){
    if (!this.playlistService.currentTrack.visible){
      const newTrack = this.playlistService.recentPageOrAlt()
      this.router.navigate([newTrack])
    }

    this.toggleContainer()
  }

}
