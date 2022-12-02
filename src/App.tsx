import React from "react";
import "./App.scss";
import { Header } from "./components/header";
import { Table, Row, Cell } from "./components/Table";
import { TreeView } from "./components/TreeView";
import { RowMenu } from "./components/TreeView/RowMenu";
import { createFakeData, IFetchData } from "./fetch";
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
const entity = {
  id: 31336,
  rowName: "dd58a48a-9924-4f76-a605-ad213c5b41a8",
};

export type Entity = {
  name: string;
  child: Entity[];
};

const treeData: IFetchData[] = [createFakeData(), createFakeData()];

treeData[0].child.push(createFakeData());
treeData[0].child.push(createFakeData());
treeData[0].child.push(createFakeData());

function App() {
  return (
    <div className="App">
      {/* <Header></Header> */}
      {/* <RowMenu /> */}
      {/* <TreeView data={treeData} /> */}

      <Table data={treeData}>
        <Row>
          <Cell>1000</Cell>
          <Cell>10 000 000.555</Cell>
          <Cell>21</Cell>
          <Cell>23 250</Cell>
        </Row>
        <Row>
          <Cell>10 000 000.555</Cell>
          <Cell>1000</Cell>
          <Cell>23 250</Cell>
          <Cell>21</Cell>
        </Row>
        <Row>
          <Cell>21.5</Cell>
          <Cell>10 000 000.555</Cell>
          <Cell>1000</Cell>
          <Cell>23 250</Cell>
        </Row>
        <Row>
          <Cell>23 250</Cell>
          <Cell>21</Cell>
          <Cell>10 000 000.555</Cell>
          <Cell>1000</Cell>
        </Row>
      </Table>
    </div>
  );
}

export default App;
