import React, { useEffect, useState } from 'react';
import { IFetchData, FetchDataProxy } from './api/api.types';
import './App.scss';
import { Header } from './components/header';
import { TableView } from './components/TableView/TableView';
import { Table } from './Table';

// 185.244.172.108:8081
type Entity = {
  id: number;
  rowName: string; // "dd58a48a-9924-4f76-a605-ad213c5b41a8",
};

// const treeData: IFetchData[] = [createFakeData(), createFakeData()];
const treeData: IFetchData[] = [];
// treeData[0].child.push(createFakeData());
// treeData[0].child.push(createFakeData());
// treeData[0].child.push(createFakeData());

const tbl = new Table<IFetchData>(Object.keys(FetchDataProxy));

function App() {
  console.log('App: ');
  let [trig, set_trig] = useState(false); // только для отрисовки

  // http://185.244.172.108:8081/v1/outlay-rows/entity/    4/row/list
  // http://185.244.172.108:8081/v1/outlay-rows/entity/create

  // const state = useRequest<Entity>('http://185.244.172.108:8081/v1/outlay-rows/entity/', 'POST', 'create');

  useEffect(() => {
    console.log('useEffect');

    tbl.setData(treeData);
    set_trig(!trig);

    //   if (state.isFulfilled) {
    //     console.log('useEffect isFulfilled');
    //     tbl.setData(treeData);
    //     set_trig(!trig);
    //   }
    // }, [state]);
  }, []);

  return (
    <div className='App'>
      {/* <Header></Header> */}
      {/* <RowMenu /> */}
      {/* <TreeView data={treeData} /> */}

      {/* <TableView table={tbl} data={treeData} /> */}
      <TableView table={tbl} />
    </div>
  );
}

export default App;
