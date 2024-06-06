export interface Video {
    id: string;
    title: string;
    url: string;
  }
  
  export interface VideoBNCC extends Video {
    date: string;
    year: number;
    stage: string;
    axis: string;
    skills: string;
  }