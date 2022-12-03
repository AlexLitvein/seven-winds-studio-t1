import { Entity } from "../../App";
import { IFetchData } from "../../fetch";

export interface ITreeViewProps {
  data: IFetchData[];
  // data: Entity[];
  // onClick: (idHtmlElm: string, gIdx: number, data: IFetchData) => void;
  onClick: (idHtmlElm: string, data: IFetchData) => void;
}

export interface ITreeItemProps {
  data: IFetchData;
  level: number;
  // i: number;
  // onClick: (idHtmlElm: string, gIdx: number, data: IFetchData) => void;
  onClick: (idHtmlElm: string, data: IFetchData) => void;
}

export interface IRowMenuProps {
  level: number;
  isNode: boolean;
  // onClick: (level:number, event: React.MouseEvent<HTMLImageElement>) => void;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}
