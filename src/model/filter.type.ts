export type BadgeIds = "scheduled" | "completed" | "freedEpisode";

export interface BadgeDataEntity {
  id: BadgeIds;
  label: string;
}

export interface BadgeModel extends BadgeDataEntity {
  isActive?: boolean;
  onClick: (id: string) => void;
}
