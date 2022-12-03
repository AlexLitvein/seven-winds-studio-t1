import { genRandonString, randomInRange } from "./utils";

export interface IFetchData {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  child: IFetchData[];
}

let id = 0;
export const createFakeData = (): IFetchData => {
  return {
    id: id++,
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

export function fetchData(startData: Date, range: number) {
  const endData = new Date(startData);
  endData.setDate(endData.getDate() + range);

  console.log("fetchData_req->", {
    startData: startData.toISOString(),
    endData: endData.toISOString(),
  });

  return fetch("/v1/outlay-rows/entity/{eID}/row/create", {
    //   body: JSON.stringify({ startData: startData.toISOString(), endData: endData.toISOString() }),
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "cors", // WARN: обязательно! и на сервере разрешить корс
  })
    .then((request) => request.text())
    .then((text) => {
      return JSON.parse(text);
    })
    .catch((error) => {
      console.log("err fetch: ", error);
    });
}
