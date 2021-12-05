import axios from "axios";
import React, { useEffect, useState } from "react";
import { ComicComponent } from "../components";
import { ComicRankApiSuccessResponse, Periods } from "../model";

export const ComicContainer = () => {
  const [data, setData] = useState<ComicRankApiSuccessResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        process.env.REACT_APP_BASE_URL + "/api/comics/romance?page=1"
      );

      return result.data;
    };

    fetchData().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      {data?.data.map((comic) => {
        return (
          <ComicComponent
            key={comic.id}
            id={comic.id}
            currentRank={comic.currentRank}
            previousRank={comic.previousRank}
            title={comic.title}
            artists={comic.artists}
            freedEpisodeSize={comic.freedEpisodeSize}
            contentsState={comic.contentsState}
            schedule={comic.schedule}
            thumbnailSrc={comic.thumbnailSrc}
            onClick={(id) => console.log(id)}
          />
        );
      })}
    </div>
  );
};
