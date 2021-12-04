import React, { FC, useState } from "react";
import styled from "styled-components";
import { BadgeComponent } from "../components";
import { BADGE_DATA } from "../constants";

const Wrap = styled.div`
  margin: 16px 0;
`;

export const FilterContainer: FC = () => {
  const [currentFilter, setCurrentFilter] = useState<string[]>(["1"]);

  const handleBadgeToggle = (id: string) => () => {
    if (currentFilter.includes(id)) {
      setCurrentFilter(currentFilter.filter((c) => c !== id));
      return;
    }

    setCurrentFilter((prev) => [...prev, id]);
  };

  return (
    <Wrap>
      {BADGE_DATA.map((badge) => (
        <BadgeComponent
          key={badge.id}
          id={badge.id}
          label={badge.label}
          isActive={currentFilter.includes(badge.id)}
          onClick={handleBadgeToggle(badge.id)}
        />
      ))}
    </Wrap>
  );
};
