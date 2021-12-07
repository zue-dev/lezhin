import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { BadgeComponent, ComicComponent } from "../components";
import { BADGE_DATA } from "../constants";
import { BadgeIds } from "../model";
import { effRomanceGenre } from "../redux/romance.effect";
import { selRomanceGenre } from "../redux/romance.selector";
import { romanceSlice } from "../redux/romance.slice";

const Wrap = styled.div`
  max-width: 414px;
  margin: 0 auto;
  padding: 32px 16px;
  background-color: white;
`;

const InnerWrap = styled.div`
  margin: 16px 0;
`;

export const RomanceContainer = () => {
  const sentinel = useRef(null);
  const dispatch = useDispatch();
  const { actions } = romanceSlice;
  const { filteredComics, comics, error, loading } =
    useSelector(selRomanceGenre);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<BadgeIds[]>([]);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];

    if (!target.isIntersecting) {
      return;
    }

    setCurrentPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });

    if (sentinel.current) {
      io.observe(sentinel.current);
    }
  }, [handleObserver]);

  useEffect(() => {
    const maxPage = 5;
    if (currentPage <= maxPage) {
      dispatch(effRomanceGenre(currentPage));
    }
  }, [currentPage, dispatch]);

  const handleBadgeToggle = (id: BadgeIds) => () => {
    if (currentFilters.includes(id)) {
      setCurrentFilters((prev) => prev.filter((item) => item !== id));
      return;
    }

    if (currentFilters.includes("completed") && id === "scheduled") {
      setCurrentFilters((prev) => prev.filter((id) => id !== "completed"));
    }

    if (currentFilters.includes("scheduled") && id === "completed") {
      setCurrentFilters((prev) => prev.filter((id) => id !== "scheduled"));
    }

    setCurrentFilters((prev) => [...prev, id]);
  };

  useEffect(() => {
    dispatch(actions.selectFilter(currentFilters));
  }, [currentFilters, actions, dispatch]);

  return (
    <Wrap>
      <h1>로맨스 장르 랭킹</h1>
      <InnerWrap>
        {BADGE_DATA.map((badge) => (
          <BadgeComponent
            key={badge.id}
            id={badge.id}
            label={badge.label}
            isActive={currentFilters.includes(badge.id)}
            onClick={handleBadgeToggle(badge.id)}
          />
        ))}
      </InnerWrap>

      {(currentFilters.length ? filteredComics : comics)?.map((comic) => {
        return (
          <ComicComponent
            key={comic.id}
            {...comic}
            onClick={(id) => console.log(id)}
          />
        );
      })}
      <div ref={sentinel}></div>
      {loading && <div>loading...</div>}
      {error && <div>{error}</div>}
    </Wrap>
  );
};
