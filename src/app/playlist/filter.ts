
enum TrackTag {
    collage = "Collage",
    filmScore = "Film Score",
  }
  
  
  
  export interface TagFilter {
    title: string;
    tag: string;
    enabled: boolean;
  }