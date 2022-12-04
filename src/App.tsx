import React from "react";
import "./App.scss";
import { Header } from "./components/header";
import { TableView } from "./components/TableView/TableView";
import { createFakeData, IFetchData } from "./fetch";
import { Table } from "./Table";
// import { TreeView, RowMenu, Row, Table, Cell } from "./components/TreeView";

// {
//   name: "111",
//   child: [],
// },
// {
//   name: "222",
//   child: [
//     {
//       name: "2-11",
//       child: [
//         {
//           name: "2-1-1",
//           child: [],
//         },
//         {
//           name: "2-1-2",
//           child: [],
//         },
//       ],
//     },
//     {
//       name: "2-22",
//       child: [],
//     },
//   ],
// },

// 185.244.172.108:8081
// const entity = {
//   id: 31336,
//   rowName: "dd58a48a-9924-4f76-a605-ad213c5b41a8",
// };

// export type Entity = {
//   name: string;
//   child: Entity[];
// };

const treeData: IFetchData[] = [createFakeData(), createFakeData()];

treeData[0].child.push(createFakeData());
treeData[0].child.push(createFakeData());
treeData[0].child.push(createFakeData());

const tbl = new Table(treeData);

function App() {
  return (
    <div className="App">
      {/* <Header></Header> */}
      {/* <RowMenu /> */}
      {/* <TreeView data={treeData} /> */}

      {/* <Table columnsNamesObj={treeData[0]} data={treeData} /> */}
      {/* <TableView columnsNames={tbl.columnsName} data={treeData} /> */}
      <TableView table={tbl} data={treeData} />
    </div>
  );
}

export default App;
