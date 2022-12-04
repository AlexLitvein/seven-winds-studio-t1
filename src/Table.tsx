import { IFetchData } from './fetch';

export type HiddenData = {
  elm: IFetchData | undefined;
  parent: IFetchData | IFetchData[] | undefined;
};

export type SelectedData = {
  row: IFetchData | undefined;
  cellName: string | undefined;
  isEdit: boolean;
  // parent: IFetchData | IFetchData[] | undefined;
};

export class Table {
  private readonly _data: IFetchData[] = [];
  private readonly _columnsNames: string[] = [];

  private _hiddenData: HiddenData = { elm: undefined, parent: undefined };
  private _selectedData: SelectedData = {
    row: undefined,
    cellName: undefined,
    isEdit: false,
  };

  constructor(data: IFetchData[]) {
    const { child, ...objData } = data[0];

    this._data = data;
    this._columnsNames = Object.keys(objData);
  }

  get data() {
    return this._data;
  }
  get columnsNames() {
    return this._columnsNames;
  }

  get hiddenData() {
    return this._hiddenData;
  }

  get selectedData() {
    return this._selectedData;
  }

  set hiddenData(hiddenData: HiddenData) {
    this._hiddenData = hiddenData;
  }
  set selectedData(selectedData: SelectedData) {
    // if(selectedData.){

    // }
    if (this._selectedData.isEdit && selectedData.cellName === this._selectedData.cellName) {
      selectedData.isEdit = true;
    }
    // else {
    //   selectedData.isEdit = true;
    // }
    this._selectedData = selectedData;
  }
}
