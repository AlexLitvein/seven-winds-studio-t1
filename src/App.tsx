import React, { useEffect, useState } from 'react';
import { IFetchData, FetchDataProxy } from './api/api.types';
import './App.scss';
import { Header } from './components/header';
import { TableView } from './components/TableView/TableView';
import { TreeView } from './components/TreeView';
import { TreeViewDataDef } from './components/TreeView/TreeView.types';
import { Table } from './Table';
import { createFakeData } from './utils';

// 185.244.172.108:8081
type Entity = {
  id: number;
  rowName: string; // "dd58a48a-9924-4f76-a605-ad213c5b41a8",
};

// const treeData: IFetchData[] = [];
const treeData: IFetchData[] = [createFakeData(), createFakeData()];
treeData[0]?.child?.push(createFakeData());
treeData[0]?.child?.push(createFakeData());
treeData[0]?.child?.push(createFakeData());

const tbl = new Table<IFetchData>(Object.keys(FetchDataProxy));

const dataDef: TreeViewDataDef<IFetchData> = {
  nameField: 'rowName',
  childField: 'child',
};

// const onTreeViewItemMenuClick = (idElm: string, elm: IFetchData, parent: IFetchData | IFetchData[] | undefined) => {
//   console.log({
//     idElm,
//     elm,
//     parent,
//   });

//   switch (idElm) {
//     case 'folder1':
//       table.hiddenData = {
//         elm: table.hiddenData.elm?.id !== elm.id ? elm : undefined,
//         parent,
//       };
//       break;

//     case 'folder2':
//       const tmp = createFakeData();
//       tmp.child.push(createFakeData());
//       if (parent) {
//         elm.child.push(tmp);
//       } else {
//         data.push(tmp);
//       }
//       break;

//     case 'doc':
//       if (parent) {
//         elm.child.length !== 0 && elm.child.push(createFakeData());
//       } else {
//         data.push(createFakeData());
//       }
//       break;

//     case 'del':
//       let whereFind: IFetchData[] | undefined = undefined;
//       if (Array.isArray(parent)) {
//         whereFind = parent;
//       } else {
//         whereFind = parent?.child;
//       }

//       if (whereFind) {
//         const idx = whereFind.findIndex((el) => el.id === elm?.id);
//         idx !== undefined && whereFind.splice(idx, 1);
//         table.hiddenData = { elm: undefined, parent: undefined };
//       }
//       break;

//     default:
//       break;
//   }

//   set_trig(!trig);
// };

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

      <div className='table-view'>
        <div className='tree-panel'>
          <TreeView dataDef={dataDef} data={tbl.data} onClick={() => {}} />
        </div>

        <div className='data-panel'>
          <TableView table={tbl} />
        </div>
      </div>
    </div>
  );
}

export default App;
