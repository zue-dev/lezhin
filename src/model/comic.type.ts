export type ContentState = "scheduled" | "completed";

export type Period = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export type ArtistRole =
  | "writer"
  | "painter"
  | "scripter"
  | "original"
  | "publisher"
  | "label";

export interface Periods {
  periods: Period[];
}

export interface Artist {
  name: string;
  role: ArtistRole;
  id: string;
}

export interface ComicEntity {
  id: number;
  alias: string;
  title: string;
  artists: Artist[];
  schedule: Periods;
  genres: string[];
  freedEpisodeSize: number;
  contentsState: ContentState;
  currentRank: number;
  previousRank: number;
  updatedAt: number;
  print: boolean;
  thumbnailSrc: string;
}

export interface ComicModel {
  id: number;
  currentRank: number;
  previousRank: number;
  title: string;
  artists: Artist[];
  freedEpisodeSize: number;
  contentsState: ContentState;
  schedule: Periods;
  thumbnailSrc: string;
  onClick: (id: number) => void;
}

export interface ComicRankApiSuccessResponse {
  count: number;
  hasNext: boolean;
  data: ComicEntity[];
}
