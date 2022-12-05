import { IFetchData } from '../../api/api.types';
import { SelectedData, Table } from '../../Table';

export type CellClickCb = (cellName: string, value: string, row: IFetchData | undefined, isDblClick: boolean) => void;

export type CellInputCb = (cellName: string, value: string, row: IFetchData | undefined) => void;

export interface ITableProps<T> {
  table: Table<T>;
  // data: T[];
}

export interface IRowProps {
  //   data: (string | number)[];
  data: IFetchData;
  selData: SelectedData;
  // isSelected: boolean;
  // selectedCellName?: string;
  onClick: CellClickCb;
}

export interface ITableHeaderProps {
  data: (string | number)[];
  //   onClick:(value: string|number)=>void;
}

export interface ICellProps {
  name: string;
  // name: FetchDataKey;
  row: IFetchData | undefined;
  // row: IFetchData;
  isSelected: boolean;
  isEdit: boolean;
  //   children?: React.ReactNode;
  // value: string | number;
  value: string;
  onClick: CellClickCb;
  // onInput: CellInput;
  onEnter: CellInputCb;
}

export interface ICellIputProps {
  value: string;
  // onClick: CellClickCb;
  onEnter: (value: string) => void;
}
