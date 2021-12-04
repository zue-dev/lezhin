import React, { FC } from "react";
import styled from "styled-components";
import { BadgeModel } from "../model";

interface BadgeProps {
  isActive?: boolean;
}

const Wrap = styled.button<BadgeProps>`
  height: 40px;
  padding: 0 16px;
  margin-right: 8px;
  border-radius: 20px;
  color: ${({ isActive }) => (isActive ? "white" : "black")};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.red : theme.gray};
`;

export const BadgeComponent: FC<BadgeModel> = ({
  isActive,
  label,
  id,
  onClick,
}) => {
  const handleClick = (id: string) => () => {
    onClick(id);
  };

  return (
    <Wrap isActive={isActive} onClick={handleClick(id)}>
      {label}
    </Wrap>
  );
};
