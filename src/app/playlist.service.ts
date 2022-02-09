import { Injectable } from '@angular/core';

import tracksJSON from './tracks.json'; 

const tracks = tracksJSON.tracks.map(x => <Track>x) 

export interface Track {
  title: string;
  url: string;
  tags: string[]
}

enum TrackTag {
  collage = "Collage",
  filmScore = "Film Score",
}

export class FilterableTrack {
  private track: Track
  visible: boolean

  constructor(
    track: Track,
    visible: boolean | undefined = true
  ){
    this.track = track
    this.visible = visible
  }

  get title(): string {
    return this.track.title
  }
  get tags(): string[] {
    return this.track.tags
  }

  get url(): string {
    return this.track.url
  }
}

export const tagFilters: TagFilter[] = [
  {title: "Collage", tag: "collage", enabled: false },
  {title: "Film Score", tag: "filmScore", enabled: false }
]

export interface TagFilter {
  title: string;
  tag: string;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public tracks: FilterableTrack[]
  private _currentTrackIndex: number
  // the index of the current track from master track list regardless of filter.
  private _currentTrackMasterIndex: number
  private _previousTrackIndex: number | null = null
  private _filters: TagFilter[] = tagFilters

  get visibleTracks(): FilterableTrack[] {
    return this.tracks.filter(x=> x.visible)
  }

  get currentTrackIndex(): number {
    return this._currentTrackIndex;
  }
  get previousTrackIndex(): number | null {
    return this._previousTrackIndex
  }
  get filters(): TagFilter[] {
    return this._filters
  }

  set currentTrackIndex(val: number) {
    this._previousTrackIndex = this.currentTrackIndex
    this._currentTrackIndex = val
    this.setNextPrev();
  }
  private _isNextTrackEnabled: boolean
  private _isPrevTrackEnabled: boolean

  get isNextTrackEnabled(): boolean { return this._isNextTrackEnabled}
  get isPrevTrackEnabled(): boolean { return this._isPrevTrackEnabled}

  constructor() {
    const filterableTracks = tracks.map(x=> new FilterableTrack(x, true))
    this.tracks = filterableTracks;
    this._isNextTrackEnabled = getNextTrack(filterableTracks, 0) != null;
    this._isPrevTrackEnabled = getPrevTrack(filterableTracks, 0) != null;
    this._currentTrackMasterIndex = 0;
    this._currentTrackIndex = 0;
    // this._filters = tagFilters;
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
      // this.tracks = tracks.map(x=> new FilterableTrack(x, true));
      for (var track of this.tracks ){
        track.visible = true;
      }
      // console.log("NO FILT")
      return
    }
    // const filteredTracks: Track[] = []
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
    console.log(this.tracks);
    // console.log(filteredTracks);
    // this.tracks = filteredTracks;
  }

  

  clearFilter(){
    for (var filter of this._filters){
      filter.enabled = false;
    }
    for (var track of this.tracks ){
      track.visible = true;
    }
  }


  setNextPrev() {
    // console.log("next tracks here!")
    const nextTracks = this.visibleTracks.slice(this._currentTrackIndex + 1);
    console.log(nextTracks)
    // console.log("STILL HERE")
    this._isNextTrackEnabled = this.nextTrackURL != null;
    // console.log("STILL HERE 2")
    // console.log("SET PREV TRACK ENABLED: " + (this.prevTrackURL != null))
    this._isPrevTrackEnabled = this.prevTrackURL != null;
    
  }


  get nextTrackURL(): string | null {

    return getNextTrackURL(this.tracks, this._currentTrackMasterIndex)
  }
  get prevTrackURL(): string | null {
    // console.log("PREVIOSU:")
    // const previousTracks = this.tracks.slice(0, this._currentTrackMasterIndex);
    // const length = previousTracks.length;
    // console.log("LENGTH: "+ length);
    // const reverseIndex = previousTracks.reverse().findIndex(x => x.visible)

    // console.log("index: "+ reverseIndex);
    // if (reverseIndex < 0){
    //   return null
    // }
    // console.log(Math.abs(reverseIndex - (length -1)))
    // return  Math.abs(reverseIndex - length);
    return getPrevTrackURL(this.tracks, this._currentTrackMasterIndex)
  }
  get nextTrack(): FilterableTrack | null {
    return getNextTrack(this.tracks, this._currentTrackMasterIndex)
  }
  get prevTrack(): FilterableTrack | null {

    return getPrevTrack(this.tracks, this._currentTrackMasterIndex)
  }

  newURL(track: FilterableTrack ){
    console.log("NEW URL: "+ track)
    console.log("__________________________________________")

    const index = this.tracks.findIndex(x => x == track);
    if (index > -1) {
      // console.log("MATCH 3?")
      // console.log(index)
      this._currentTrackMasterIndex = index;
      // this._currentTrackIndex = visibleIndex;
    }


    const visibleIndex = this.visibleTracks.findIndex(x => x == track);
    if (visibleIndex > -1) {
      // console.log("MATCH 2?")
      // console.log(visibleIndex)
      this.currentTrackIndex = visibleIndex;
      // this._currentTrackIndex = visibleIndex;
    }

  }

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


function addTrackIfDoesNotExist(tracks: Track[], track: Track){

}


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
  console.log("NEXT TRACK LENGTH: "+ nextTracks.length)
  const nextIndex = nextTracks.findIndex(x => x.visible)
  if (nextIndex < 0) {
    console.log("NULL")
    return null
  }
  const index = indexOffset + nextIndex
  console.log("NEXT INDEX: " + index)
  return index
  const nextTrackIndex = currentIndex + 1;
  if(nextTrackIndex < tracks.length){
    return nextTrackIndex
  }
  return null
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
  console.log(prevTrackIndex)
  if (prevTrackIndex != null){
    return tracks[prevTrackIndex]
  } 
  return null
}

function getPrevtIndex(tracks: FilterableTrack[], currentIndex: number) : number | null {

  // console.log("PREVIOSU:")
  const previousTracks = tracks.slice(0, currentIndex);
  const length = previousTracks.length;
  // console.log("LENGTH: "+ length);
  const reverseIndex = previousTracks.reverse().findIndex(x => x.visible)

  // console.log("reverse index: "+ reverseIndex);
  if (reverseIndex < 0){
    return null
  }
  const index = Math.abs(reverseIndex - (length -1))
  // console.log("INDEX: " + index)
  return index
}