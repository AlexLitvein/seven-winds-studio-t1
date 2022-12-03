import { Entity } from "../../App";
import { IFetchData } from "../../fetch";

export interface ITableProps {
  //  tag: string;
  //  sx?: SxProps;
  data: IFetchData[];
  //   children?: React.ReactNode;
}

export interface IRowProps {
  //  tag: string;
  //  sx?: SxProps;
  children?: React.ReactNode;
}

export interface ICellProps {
  //  tag: string;
  //  sx?: SxProps;
  children?: React.ReactNode;
}
