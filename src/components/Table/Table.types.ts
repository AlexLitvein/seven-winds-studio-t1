import { IFetchData, IFetchObjData } from "../../fetch";

export interface ITableProps {
  columnsNames: string[];
  data: IFetchData[];
}

export interface IRowProps {
  //   data: (string | number)[];
  data: IFetchData;
  isSelected: boolean;
  onClick: (row: IFetchData) => void;
}

export interface ITableHeaderProps {
  data: (string | number)[];
  //   onClick:(value: string|number)=>void;
}

export interface ICellProps {
  name: string;
  row: IFetchData | undefined;
  isSelected: boolean;
  //   children?: React.ReactNode;
  value: string | number;
  onClick: (
    name: string,
    row: IFetchData | undefined,
    value: string | number
  ) => void;
}
