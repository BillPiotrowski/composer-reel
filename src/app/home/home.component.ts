import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../playlist/playlist.service';
import { tagFilters } from '../playlist/filter';
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
