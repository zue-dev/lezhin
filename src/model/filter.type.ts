export interface BadgeDataEntity {
  id: string;
  label: string;
}

export interface BadgeModel extends BadgeDataEntity {
  isActive?: boolean;
  onClick: (id: string) => void;
}
