import { createSlice } from "@reduxjs/toolkit";
import { ComicEntity } from "../model";
import { effComicRankItem } from "./comic.effect";

interface ComicRankItemState {
  comics: ComicEntity[];
  loading: boolean;
  error: string;
}

const getInitComicRankItmState = () => {
  const result: ComicRankItemState = {
    comics: [],
    loading: false,
    error: "",
  };
  return result;
};

export const comicSlice = createSlice({
  name: "comicRankItem",
  initialState: getInitComicRankItmState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(effComicRankItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(effComicRankItem.fulfilled, (state, { payload }) => {
        state.comics.push(...payload.data);
      })
      .addCase(effComicRankItem.rejected, (state) => {
        state.loading = false;
      });
  },
});
