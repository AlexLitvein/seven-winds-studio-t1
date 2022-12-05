import { IFetchData } from './api/api.types';

export type HiddenData = {
  elm: IFetchData | undefined;
  parent: IFetchData | IFetchData[] | undefined;
};

export type SelectedData = {
  row: IFetchData | undefined;
  cellName: string | undefined;
  isEdit: boolean;
  value: string;
};

export class Table<T> {
  private _data: T[] = [];
  private _columnsNames: string[] = [];

  private _hiddenData: HiddenData = { elm: undefined, parent: undefined };
  private _selectedData: SelectedData = {
    row: undefined,
    cellName: undefined,
    isEdit: false,
    value: '',
  };

  //=========  constructor ==============
  constructor(columnsName: string[]) {
    this._columnsNames = [...columnsName];
  }

  setData(data: T[] | undefined) {
    console.log('setData->', {
      data,
    });

    if (data?.length) {
      this._data = data;
    }
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

    if (this._selectedData.value !== selectedData.value) {
      selectedData.isEdit = false;
    }
    // else {
    //   selectedData.isEdit = true;
    // }
    this._selectedData = selectedData;
  }
}
