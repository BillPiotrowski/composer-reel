import { TagFilter } from "./filter"
import { tagFilters } from "./playlist.service"

export interface Track {
    title: string
    url: string
    tags: string[]
    description: string
    videoFileName: string
}

export class FilterableTrack {
    private track: Track
    visible: boolean
    tagClasses: TagFilter[]
  
    constructor(
      track: Track,
      visible: boolean | undefined = true
    ){
        const tagClasses = track.tags.map(x => {
            const index = tagFilters.findIndex(y => y.tag == x)
            return tagFilters[index]
        })
        
      this.track = track
      this.visible = visible
      this.tagClasses = tagClasses

    }
  
    get title(): string { return this.track.title }
    get tags(): string[] { return this.track.tags }
    get url(): string { return this.track.url }
    get description(): string { return this.track.description }
    get videoURL(): string { return "/assets/video/" + this.videoFileName }
    get videoFileName(): string { return this.track.videoFileName}
}