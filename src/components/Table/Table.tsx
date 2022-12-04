import React, { useState, useEffect, useCallback } from "react";
import {
  ITableProps,
  IRowProps,
  ICellProps,
  ITableHeaderProps,
} from "./Table.types";
import "./Table.style.scss";
import { TreeView } from "../TreeView";
import { createFakeData, IFetchData } from "../../fetch";
import { Selected } from "../TreeView/TreeView.types";

export const Table = ({ columnsNames, data }: ITableProps) => {
  let key = 0;
  // const { child, ...firstData } = data[0];
  let [trig, set_trig] = useState(false); // только для отрисовки
  // let [selectedData, set_selectedData] = useState<IFetchData | undefined>(
  // TODO: rename
  let [selectedData, set_selectedData] = useState<Selected>({
    elm: undefined,
    parent: undefined,
  });
  let [hiddenData, set_hiddenData] = useState<Selected>({
    elm: undefined,
    parent: undefined,
  });

  console.log("Table->", {
    data,
  });

  // const onItemMenuClick = useCallback(
  //   (
  //     idElm: string,
  //     elm: IFetchData,
  //     parent: IFetchData | IFetchData[] | undefined
  //   ) => {
  //     console.log({
  //       idElm,
  //       elm,
  //       parent,
  //     });

  //     switch (idElm) {
  //       case "folder1":
  //         set_selectedData((prev) => ({
  //           elm: prev.elm?.id !== elm.id ? elm : undefined,
  //           parent,
  //         }));
  //         break;

  //       case "folder2":
  //         const tmp = createFakeData();
  //         tmp.child.push(createFakeData());
  //         elm.child.push(tmp);
  //         break;

  //       case "doc":
  //         elm.child.length !== 0 && elm.child.push(createFakeData());
  //         break;

  //       case "del":
  //         if (Array.isArray(parent)) {
  //           console.log("isArray: ");
  //           elm && parent.splice(elm.id, 1);
  //           set_selectedData({ elm: undefined, parent: undefined });
  //         } else {
  //           console.log("not_isArray: ");
  //           const idx = parent?.child.findIndex((el) => el.id === elm?.id);
  //           idx !== undefined && parent?.child.splice(idx, 1);
  //           set_selectedData({ elm: undefined, parent: undefined });
  //         }

  //         break;

  //       default:
  //         break;
  //     }

  //     set_trig(!trig);
  //   },
  //   []
  // );

  const onRowClick = (row: IFetchData) => {
    set_selectedData({ elm: row, parent: undefined });
  };

  const onTreeViewItemMenuClick = (
    idElm: string,
    elm: IFetchData,
    parent: IFetchData | IFetchData[] | undefined
  ) => {
    console.log({
      idElm,
      elm,
      parent,
    });

    switch (idElm) {
      case "folder1":
        set_hiddenData((prev) => ({
          elm: prev.elm?.id !== elm.id ? elm : undefined,
          parent,
        }));
        break;

      case "folder2":
        const tmp = createFakeData();
        tmp.child.push(createFakeData());
        if (parent) {
          elm.child.push(tmp);
        } else {
          data.push(tmp);
        }
        break;

      case "doc":
        // elm.child.length !== 0 && elm.child.push(createFakeData());

        if (parent) {
          elm.child.length !== 0 && elm.child.push(createFakeData());
        } else {
          data.push(createFakeData());
        }
        break;

      case "del":
        let whereFind: IFetchData[] | undefined = undefined;
        if (Array.isArray(parent)) {
          whereFind = parent;
        } else {
          whereFind = parent?.child;
        }

        if (whereFind) {
          const idx = whereFind.findIndex((el) => el.id === elm?.id);
          idx !== undefined && whereFind.splice(idx, 1);
          set_hiddenData({ elm: undefined, parent: undefined });
        }
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
        <Row
          key={key}
          data={data}
          onClick={onRowClick}
          isSelected={selectedData.elm?.id === data.id}
        />
        {hiddenData.elm?.id !== data.id &&
          child.map((el, idx) => renderRow(key++, el))}
      </>
    );
  };

  return (
    <div className="table">
      <div className="tree-panel">
        <TreeView data={data} onClick={onTreeViewItemMenuClick} />
      </div>
      <div className="data-panel">
        <TableHeader data={columnsNames} />
        {data.map((el, idx) => {
          return renderRow(key++, el); //INFO: ++ именно тут
        })}
      </div>
    </div>
  );
};

export const Row = ({ data, isSelected, onClick }: IRowProps) => {
  const { child, ...objData } = data;
  let [selectedCell, set_selectedCell] = useState("");

  const onCellClick = (
    name: string,
    row: IFetchData | undefined,
    value: string | number
  ) => {
    set_selectedCell(name);
  };

  return (
    <div
      className={`row${isSelected ? " row-selected" : ""}`}
      onClick={() => onClick(data)}
    >
      {(Object.keys(objData) as Array<keyof typeof objData>).map((el, idx) => {
        return (
          <Cell
            key={idx}
            onClick={onCellClick}
            name={el}
            row={data}
            isSelected={selectedCell === el}
            value={objData[el]}
          />
        );
      })}
    </div>
  );
};

export const TableHeader = ({ data }: ITableHeaderProps) => {
  return (
    <div className="row">
      {data.map((el, idx) => (
        <Cell
          key={idx}
          onClick={() => {}}
          name={el.toString()}
          value={el}
          isSelected={false}
          row={undefined}
        />
      ))}
    </div>
  );
};

export const Cell = ({ name, row, isSelected, value, onClick }: ICellProps) => {
  return (
    // <div id={name} className="column">
    <div
      id={name}
      className={`column${isSelected ? " column-selected" : ""}`}
      onClick={() => onClick(name, row, value)}
    >
      {value}
    </div>
  );
};
