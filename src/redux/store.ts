import { configureStore } from "@reduxjs/toolkit";
import { romanceSlice } from "./romance.slice";

const store = configureStore({
  reducer: {
    romance: romanceSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
