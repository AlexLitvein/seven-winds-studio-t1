import React, { useState, useEffect } from "react";
import { ITableProps, IRowProps, ICellProps } from "./Table.types";
import "./Table.style.scss";
import { TreeView } from "../TreeView";
import { IFetchData } from "../../fetch";

export const Table = ({ data }: ITableProps) => {
  let key = 0;
  const { child, ...firstData } = data[0];
  const first = <Row key={key++} data={Object.keys(firstData)} />; // (Object.keys(data) as Array<keyof typeof data>).map((el, idx) =>

  // console.log({
  //   data,
  // });

  let [rows, set_rows] = useState<React.ReactNode[]>([first]);

  const renderRow = (data: IFetchData) => {
    const { child, ...dataObj } = data;

    rows.push(<Row key={key++} data={Object.values(dataObj)} />);
    child.forEach((el, idx) => {
      renderRow(el);
    });
  };

  const render = () => {
    data.forEach((el, idx) => {
      renderRow(el);
    });
    set_rows([...rows]);
  };

  useEffect(() => {
    render();
  }, [data]);

  return (
    <div className="table">
      <div className="tree-panel">
        <TreeView data={data} />
      </div>
      <div className="data-panel">{rows}</div>
    </div>
  );
};

export const Row = ({ data }: IRowProps) => {
  return (
    <div className="row">
      {data.map((el, idx) => (
        <Cell key={idx}>{el}</Cell>
      ))}
    </div>
  );
};

// export const Row = ({ data }: IRowProps) => {
//   const { child, ...dataProp } = data;
//   return (
//     <div className="row">
//       {(Object.keys(dataProp) as Array<keyof typeof dataProp>).map(
//         (el, idx) => (
//           <Cell key={idx}>{dataProp[el]}</Cell>
//         )
//       )}
//     </div>
//   );
// };

export const Cell = ({ children }: ICellProps) => {
  return <div className="column">{children}</div>;
};
