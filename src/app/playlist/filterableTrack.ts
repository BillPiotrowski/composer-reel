import { Track } from "./track"

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