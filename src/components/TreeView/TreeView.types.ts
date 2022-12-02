import { Entity } from "../../App";

export interface ITreeViewProps {
  data: Entity[];
}

export interface IRowMenuProps {
  level: number;
  isNode: boolean;
  // onClick: (level:number, event: React.MouseEvent<HTMLImageElement>) => void;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}

export interface ITreeItemProps {
  data: Entity;
  level: number;
  onClick: (idElm: string, data: Entity) => void;
}
