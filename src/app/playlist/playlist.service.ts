import { Injectable } from '@angular/core';

import tracksJSON from './../tracks.json'; 
import { Track, FilterableTrack } from './track';
import { TagFilter } from './filter';


export const tagFilters: TagFilter[] = [
  {title: "Collage", tag: "collage", enabled: false },
  {title: "Film Score", tag: "filmScore", enabled: false },
  {title: "Orchestral Samples", tag: "orchestral", enabled: false },
  {title: "Ondes Martenot", tag: "ondes", enabled: false }
]

const tracks = tracksJSON.tracks.map(x => <Track>x) 


@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public tracks: FilterableTrack[]
  private _currentTrackMasterIndex: number
  private _previousTrackMasterIndex: number | null = null
  private _filters: TagFilter[] = tagFilters
  private _isNextTrackEnabled: boolean
  private _isPrevTrackEnabled: boolean







  constructor() {
    const filterableTracks = tracks.map(x=> new FilterableTrack(x, true))
    this.tracks = filterableTracks;
    this._isNextTrackEnabled = getNextTrack(filterableTracks, 0) != null;
    this._isPrevTrackEnabled = getPrevTrack(filterableTracks, 0) != null;
    this._currentTrackMasterIndex = 0;
  }





// --------------------------------- STATE PROPERTIES ---------------


  private set currentTrackMasterIndex(val: number) {
    this._previousTrackMasterIndex = this.currentTrackIndex
    this._currentTrackMasterIndex = val
    this.setNextPrev();
  }

  get visibleTracks(): FilterableTrack[] {
    return this.tracks.filter(x=> x.visible)
  }

  get currentTrackIndex(): number {
    // POTENTIAL FOR ERROR
    return this.visibleTracks.indexOf(this.tracks[this._currentTrackMasterIndex])
  }
  get previousTrackIndex(): number | null {
    const previousMasterIndex = this._previousTrackMasterIndex
    if (previousMasterIndex != null){
      return this.visibleTracks.indexOf(this.tracks[previousMasterIndex])
    }
    return null
  }
















  // -------------------------- FILTERS --------------------------


  get filters(): TagFilter[] {
    return this._filters
  }

  toggleFilter(filterTag: string){
    console.log("TOGGLING!!")
    const filter = tagFilters.find(x => x.tag == filterTag);
    if (filter){
      filter.enabled = !filter.enabled
    }
    this.applyFilters();
  }

  private get enabledFilters(): TagFilter[] {
    return this._filters.filter(x=> x.enabled == true)
  }

  private applyFilters(){
    if (this.enabledFilters.length < 1){
      for (var track of this.tracks ){
        track.visible = true;
      }
      return
    }
    for (var track of this.tracks){
      track.visible = false;
      for (var filter of this.enabledFilters) {
        if (track.tags.includes(filter.tag)){
          track.visible = true;
          continue
        }
        // else {  }
      }
    }
  }

  clearFilter(){
    for (var filter of this._filters){
      filter.enabled = false;
    }
    for (var track of this.tracks ){
      track.visible = true;
    }
  }


  








  // ----------------- NEXT / PREV FUNCTIONS ------------------------------

  setNextPrev() {
    this._isNextTrackEnabled = this.nextTrackURL != null;
    this._isPrevTrackEnabled = this.prevTrackURL != null;
    
  }

  get isNextTrackEnabled(): boolean { return this._isNextTrackEnabled}
  get isPrevTrackEnabled(): boolean { return this._isPrevTrackEnabled}
  get nextTrackURL(): string | null {
    return getNextTrackURL(this.tracks, this._currentTrackMasterIndex)
  }
  get prevTrackURL(): string | null {
    return getPrevTrackURL(this.tracks, this._currentTrackMasterIndex)
  }
  get nextTrack(): FilterableTrack | null {
    return getNextTrack(this.tracks, this._currentTrackMasterIndex)
  }
  get prevTrack(): FilterableTrack | null {
    return getPrevTrack(this.tracks, this._currentTrackMasterIndex)
  }








  // Updates playlist based on new URL information
  newURL(track: FilterableTrack ){
    const index = this.tracks.findIndex(x => x == track);
    if (index > -1) {
      this.currentTrackMasterIndex = index;
    }
  }

  // Returns the current page if it is visible (allowed by filters). If not, it returns the first index allowed by filter.
  recentPageOrAlt(): string {
    const currentPage = this.tracks[this._currentTrackMasterIndex];
    if( currentPage.visible ) {
      return currentPage.url
    }
    else {
      return this.visibleTracks[0].url
    }
  }

}














// ---------------------------- HELPER METHODS ---------------------------------


function getNextTrackURL(tracks: FilterableTrack[], currentIndex: number): string | null {
  const nextTrack = getNextTrack(tracks, currentIndex)
  if (nextTrack != null){
    return nextTrack.url
  }
  return null
}


function getNextTrack(tracks: FilterableTrack[], currentIndex: number): FilterableTrack | null {
  const nextTrackIndex = getNextIndex(tracks, currentIndex);
  if (nextTrackIndex != null){
    return tracks[nextTrackIndex]
  } 
  return null
}

function getNextIndex(tracks: FilterableTrack[], currentIndex: number) : number | null {
  const indexOffset = currentIndex + 1
  const nextTracks = tracks.slice(indexOffset)
  const nextIndex = nextTracks.findIndex(x => x.visible)
  if (nextIndex < 0) {
    return null
  }
  const index = indexOffset + nextIndex
  return index
}




function getPrevTrackURL(tracks: FilterableTrack[], currentIndex: number): string | null {
  const prevTrack = getPrevTrack(tracks, currentIndex)
  if (prevTrack != null){
    return prevTrack.url
  }
  return null
}


function getPrevTrack(tracks: FilterableTrack[], currentIndex: number): FilterableTrack | null {
  const prevTrackIndex = getPrevtIndex(tracks, currentIndex);
  if (prevTrackIndex != null){
    return tracks[prevTrackIndex]
  } 
  return null
}

function getPrevtIndex(tracks: FilterableTrack[], currentIndex: number) : number | null {
  const previousTracks = tracks.slice(0, currentIndex);
  const length = previousTracks.length;
  const reverseIndex = previousTracks.reverse().findIndex(x => x.visible)
  if (reverseIndex < 0){
    return null
  }
  const index = Math.abs(reverseIndex - (length -1))
  return index
}