import { IFetchData } from './api/api.types';

export function genRandonString(length: number) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charLength = chars.length;
  var result = '';
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}

export function randomInRange(r1: number, r2: number) {
  return r1 + Math.round(Math.random() * (r2 - r1));
}

const findDataById = (dataId: number, data: IFetchData) => {
  let out: undefined | IFetchData = undefined;
  if (data.id === dataId) {
    out = data;
  } else {
    if (data.child.length !== 0) {
      data.child.forEach((el) => {
        out = findDataById(dataId, el);
      });
    }
  }
  return out;
};

const findParentByDataId = (dataId: number, data: IFetchData[]) => {
  let out: undefined | IFetchData[] = undefined;

  data.forEach((el) => {
    const res = findDataById(dataId, el);
    if (res) {
      if (res?.id === el.id) {
        out = data;
      } else out = el.child;
    }
  });
  return out;
};

export const createFakeData = (): IFetchData => {
  return {
    id: randomInRange(100000, 100000000),
    rowName: genRandonString(5),
    total: randomInRange(1, 100000),
    salary: randomInRange(1, 100),
    mimExploitation: randomInRange(1, 10000),
    machineOperatorSalary: randomInRange(1, 1000),
    materials: randomInRange(1, 10000000),
    mainCosts: randomInRange(1, 100000),
    supportCosts: randomInRange(1, 1000),
    equipmentCosts: randomInRange(1, 10000),
    overheads: randomInRange(1, 100),
    estimatedProfit: randomInRange(1, 100000),
    child: [],
  };
};
