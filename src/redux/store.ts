import { configureStore } from "@reduxjs/toolkit";
import { comicSlice } from "./comic.slice";

const store = configureStore({
  reducer: {
    comic: comicSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
