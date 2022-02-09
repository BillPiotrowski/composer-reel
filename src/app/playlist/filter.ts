
enum TrackTag {
    collage = "Collage",
    filmScore = "Film Score",
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