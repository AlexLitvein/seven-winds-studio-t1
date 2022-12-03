import { Entity } from "../../App";
import { IFetchData } from "../../fetch";

export interface ITreeViewProps {
  data: IFetchData[];
  // data: Entity[];
}

export interface ITreeItemProps {
  data: IFetchData;
  level: number;
  onClick: (idElm: string, data: IFetchData) => void;
}

export interface IRowMenuProps {
  level: number;
  isNode: boolean;
  // onClick: (level:number, event: React.MouseEvent<HTMLImageElement>) => void;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}
