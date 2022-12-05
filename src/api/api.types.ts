const FetchDataStub = {
  id: 0,
  rowName: '',
  total: 0,
  salary: 0,
  mimExploitation: 0,
  machineOperatorSalary: 0,
  materials: 0,
  mainCosts: 0,
  supportCosts: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
};

type IFetchDataStub = typeof FetchDataStub;
export interface IFetchData extends Partial<IFetchDataStub> {
  child?: IFetchData[];
}
export type FetchDataKey = keyof IFetchData;

export const FetchDataProxy = new Proxy<IFetchDataStub>(FetchDataStub, {
  get: (proxy, name) => name,
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});
