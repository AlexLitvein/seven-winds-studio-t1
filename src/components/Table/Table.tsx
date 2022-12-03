import React, { useState, useEffect } from "react";
import { ITableProps, IRowProps, ICellProps } from "./Table.types";
import "./Table.style.scss";
import { TreeView } from "../TreeView";
import { createFakeData, IFetchData } from "../../fetch";

export const Table = ({ data }: ITableProps) => {
  let key = 0;
  const { child, ...firstData } = data[0];
  let [trig, set_trig] = useState(false); // только для отрисовки
  let [selectedData, set_selectedData] = useState<IFetchData | undefined>(
    undefined
  );

  console.log("Table->", {
    data,
  });

  // const onItemMenuClick = (idElm: string, gIdx: number, data: IFetchData) => {
  const onItemMenuClick = (idElm: string, data: IFetchData) => {
    // console.log({
    //   idElm,
    //   data,
    // });

    switch (idElm) {
      case "folder1":
        set_selectedData((prev) => (prev?.id !== data.id ? data : undefined));
        break;

      case "folder2":
        const tmp = createFakeData();
        tmp.child.push(createFakeData());
        data.child.push(tmp);
        break;

      case "doc":
        data.child.length !== 0 && data.child.push(createFakeData());
        break;

      default:
        break;
    }

    set_trig(!trig);
  };

  const renderRow = (key: number, data: IFetchData): React.ReactNode => {
    const { child, ...dataObj } = data;

    // console.log({
    //   data_id: data.id,
    //   selectedData_id: selectedData?.id,
    // });

    return (
      //INFO: из-за этого (<></>)-> Warning: Each child in a list should have a unique "key" prop
      <>
        <Row key={key} data={Object.values(dataObj)} />
        {selectedData?.id !== data.id &&
          child.map((el, idx) => renderRow(key++, el))}
      </>
    );
  };

  return (
    <div className="table">
      <div className="tree-panel">
        <TreeView data={data} onClick={onItemMenuClick} />
      </div>
      <div className="data-panel">
        <Row data={Object.keys(firstData)} />
        {data.map((el, idx) => {
          return renderRow(key++, el); //INFO: ++ именно тут
        })}
      </div>
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

export const Cell = ({ children }: ICellProps) => {
  return <div className="column">{children}</div>;
};
