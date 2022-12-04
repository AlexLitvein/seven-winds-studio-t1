import { IFetchData, IFetchObjData } from "../../fetch";
import { SelectedData, Table } from "../../Table";

export type CellClick = (
  cellName: string,
  value: string | number,
  row: IFetchData | undefined,
  isDblClick: boolean
) => void;

export interface ITableProps {
  table: Table;
  // columnsNames: string[];
  data: IFetchData[];
}

export interface IRowProps {
  //   data: (string | number)[];
  data: IFetchData;
  selData: SelectedData;
  // isSelected: boolean;
  // selectedCellName?: string;
  onClick: CellClick;
}

export interface ITableHeaderProps {
  data: (string | number)[];
  //   onClick:(value: string|number)=>void;
}

export interface ICellProps {
  name: string;
  row: IFetchData | undefined;
  isSelected: boolean;
  isEdit: boolean;
  //   children?: React.ReactNode;
  value: string | number;
  onClick: CellClick;
}
