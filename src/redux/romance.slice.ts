import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BadgeIds, ComicEntity } from "../model";
import { effRomanceGenre } from "./romance.effect";

interface RomanceGenreState {
  comics: ComicEntity[];
  filteredComics: ComicEntity[];
  loading: boolean;
  error: string;
}

const getInitRomanceGenreState = () => {
  const result: RomanceGenreState = {
    comics: [],
    filteredComics: [],
    loading: false,
    error: "",
  };
  return result;
};

export const romanceSlice = createSlice({
  name: "romanceGenre",
  initialState: getInitRomanceGenreState(),
  reducers: {
    reset() {
      return getInitRomanceGenreState();
    },
    selectFilter(state, { payload }: PayloadAction<BadgeIds[]>) {
      state.filteredComics = state.comics.filter((comic) => {
        const selectContentsState =
          payload.includes("scheduled") || payload.includes("completed");
        const selectFreedEpisode = payload.includes("freedEpisode");
        const hasContentsState = payload.includes(comic.contentsState);
        const isFreedEpisode = comic.freedEpisodeSize > 2;

        if (selectContentsState && selectFreedEpisode) {
          return hasContentsState && isFreedEpisode;
        }

        if (selectContentsState) {
          return hasContentsState;
        }
        if (selectFreedEpisode) {
          return isFreedEpisode;
        }

        return false;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(effRomanceGenre.pending, (state) => {
        state.loading = true;
      })
      .addCase(effRomanceGenre.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.comics.push(...payload.data);
      })
      .addCase(effRomanceGenre.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message || "";
      });
  },
});
