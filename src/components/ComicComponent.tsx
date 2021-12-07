import React, { FC } from "react";
import styled from "styled-components";
import { ComicModel } from "../model";
import { calcRank, convertToDay, getContentsState } from "../utils";

const Wrap = styled.button`
  display: flex;
  gap: 16px;
  width: 100%;
  margin-bottom: 16px;
  background-color: white;
`;
const Thumbnail = styled.img``;
const Item = styled.div`
  flex: 1;
  gap: 8px;
  display: flex;
  text-align: left;
  padding: 8px 0;
`;
const LeftItem = styled.div`
  flex-shrink: 0;
  flex-basis: 40px;
`;
const RightItem = styled.div``;
const Title = styled.h3`
  margin-bottom: 8px;
  word-break: keep-all;
`;
const Artists = styled.p`
  margin-bottom: 4px;
  word-break: keep-all;

  & > span:not(:last-child)::after {
    content: ", ";
  }
`;
const FreedEpisode = styled.p`
  margin-bottom: 4px;
`;
const Periods = styled.p``;

export const ComicComponent: FC<ComicModel> = ({
  id,
  currentRank,
  previousRank,
  title,
  artists,
  freedEpisodeSize,
  contentsState,
  schedule,
  thumbnailSrc,
  onClick,
}) => {
  const handleClick = (id: number) => () => {
    onClick(id);
  };

  return (
    <Wrap onClick={handleClick(id)}>
      <Thumbnail src={thumbnailSrc} alt={title} />
      <Item>
        <LeftItem>
          <h1>{currentRank}</h1>
          <p>{calcRank(currentRank, previousRank)}</p>
        </LeftItem>

        <RightItem>
          <Title>{title}</Title>
          <Artists>
            {artists.map((artist) =>
              artist.role === "writer" ||
              artist.role === "painter" ||
              artist.role === "scripter" ? (
                <span key={artist.id}>{artist.name}</span>
              ) : null
            )}
          </Artists>
          {freedEpisodeSize > 0 ? (
            <FreedEpisode>{freedEpisodeSize}화 무료</FreedEpisode>
          ) : null}
          {getContentsState(contentsState, schedule.periods) === "scheduled" ? (
            <Periods>
              매주{" "}
              {schedule.periods.map((period) => (
                <span key={period}>{convertToDay(period)}</span>
              ))}
              요일 연재
            </Periods>
          ) : (
            getContentsState(contentsState, schedule.periods)
          )}
        </RightItem>
      </Item>
    </Wrap>
  );
};
