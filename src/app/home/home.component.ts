import { Component, OnInit } from '@angular/core';
import { PlaylistService, tagFilters } from '../playlist/playlist.service';
import { Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Output() toggleVideoEvent = new EventEmitter<void>();

  constructor(
    public playlistService: PlaylistService,
  ) {

  }

  ngOnInit(): void {
  }

  toggleContainer(){
    this.toggleVideoEvent.emit()
  }


}
