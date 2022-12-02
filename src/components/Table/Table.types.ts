import { Entity } from "../../App";

export interface ITableProps {
  //  tag: string;
  //  sx?: SxProps;
  data: Entity[];
  children?: React.ReactNode;
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
