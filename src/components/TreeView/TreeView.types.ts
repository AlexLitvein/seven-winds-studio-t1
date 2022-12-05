import { IFetchData } from '../../api/api.types';

// export type Selected=[IFetchData | undefined, IFetchData | IFetchData[] | undefined];

export interface ITreeViewProps {
  data: IFetchData[];
  // data: Entity[];
  // onClick: (idHtmlElm: string, gIdx: number, data: IFetchData) => void;
  onClick: (idHtmlElm: string, data: IFetchData, parent: IFetchData | IFetchData[] | undefined) => void;
}

export interface ITreeItemProps {
  data: IFetchData;
  parent: IFetchData | IFetchData[] | undefined;
  level: number;
  // i: number;
  // onClick: (idHtmlElm: string, gIdx: number, data: IFetchData) => void;
  onClick: (idHtmlElm: string, data: IFetchData, parent: IFetchData | IFetchData[] | undefined) => void;
}

export interface IRowMenuProps {
  level: number;
  isNode: boolean;
  // onClick: (level:number, event: React.MouseEvent<HTMLImageElement>) => void;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}
