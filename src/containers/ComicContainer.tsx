import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ComicComponent } from "../components";
import { effComicRankItem } from "../redux/comic.effect";
import { selComicRankItem } from "../redux/comic.selector";

export const ComicContainer = () => {
  const sentinel = useRef(null);
  const dispatch = useDispatch();
  const { comics, error, loading } = useSelector(selComicRankItem);
  const [currentPage, setCurrentPage] = useState(1);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (target.isIntersecting) {
      setCurrentPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    if (sentinel.current) {
      observer.observe(sentinel.current);
    }
  }, [handleObserver]);

  useEffect(() => {
    dispatch(effComicRankItem(currentPage));
  }, [currentPage, dispatch]);

  console.log(comics);

  return (
    <>
      {comics?.map((comic) => {
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
      <div ref={sentinel}></div>
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
    </>
  );
};
