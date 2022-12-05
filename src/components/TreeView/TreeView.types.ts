import { IFetchData } from '../../api/api.types';

// export interface ITreeViewProps {
//   data: IFetchData[];
//   onClick: (idHtmlElm: string, data: IFetchData, parent: IFetchData | IFetchData[] | undefined) => void;
// }

// export interface ITreeItemProps {
//   data: IFetchData;
//   parent: IFetchData | IFetchData[] | undefined;
//   level: number;
//   onClick: (idHtmlElm: string, data: IFetchData, parent: IFetchData | IFetchData[] | undefined) => void;
// }

// export interface IRowMenuProps {
//   level: number;
//   isNode: boolean;
//   onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
// }

// export interface TreeViewDataDef {
//   nameField: string;
//   childField: string;
// }

export interface TreeViewDataDef<T> {
  nameField: keyof T;
  childField: keyof T;
}

export interface ITreeViewProps<T = Record<string, any>> {
  dataDef: TreeViewDataDef<T>;
  data: T[];
  onClick: (idHtmlElm: string, data: T, parent: T | T[] | undefined) => void;
}

export interface ITreeItemProps<T = Record<string, any>> {
  dataDef: TreeViewDataDef<T>;
  data: T;
  parent: T | T[] | undefined;
  level: number;
  onClick: (idHtmlElm: string, data: T, parent: T | T[] | undefined) => void;
}

export interface IRowMenuProps {
  level: number;
  isNode: boolean;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}
