import React, { useState, useEffect } from "react";
import { ITableProps, IRowProps, ICellProps } from "./Table.types";
import "./Table.style.scss";
import { TreeView } from "../TreeView";

// import { IHeaderProps } from "./Header.types";

export const Table = ({ data }: ITableProps) => {
  return (
    <div className="table">
      <div className="tree-panel">
        <TreeView data={data} />
      </div>
      <div className="data-panel"></div>
    </div>
  );
};

// export const TreeColu = ({ children }: ITableProps) => {
//   return <div className="table">{children}</div>;
// };

export const Row = ({ children }: IRowProps) => {
  return <div className="row">{children}</div>;
};

export const Cell = ({ children }: ICellProps) => {
  return <div className="column">{children}</div>;
};
