import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ComicRankApiSuccessResponse } from "../model";

export const effComicRankItem = createAsyncThunk(
  "ComicRankItem",
  async (idx: number, api) => {
    try {
      const res = await axios.get<ComicRankApiSuccessResponse>(
        process.env.REACT_APP_BASE_URL + `/api/comics/romance?page=${idx}`
      );

      return res.data;
    } catch (e) {
      throw e;
    }
  }
);
