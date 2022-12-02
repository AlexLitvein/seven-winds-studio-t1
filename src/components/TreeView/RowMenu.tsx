import React, { useState, useEffect } from "react";
import "./RowMenu.style.scss";
import doc from "../../media/doc.png";
import trash from "../../media/TrashFill.png";
import folder1 from "../../media/folder-1.png";
import folder2 from "../../media/folder-2.png";
import { IRowMenuProps } from "./TreeView.types";

export const RowMenu = ({ level, isNode, onClick }: IRowMenuProps) => {
  return (
    <div className="row-menu">
      {/* <button>
        <img src={folder1} alt="" />
      </button> */}

      {isNode && level === 0 && (
        <img id="folder1" src={folder1} alt="" onClick={onClick} />
      )}

      {isNode && (
        <img
          id="folder2"
          src={folder2}
          alt=""
          // onClick={level !== 0 ? onClick : () => {}}
          onClick={onClick}
        />
      )}

      <img id="doc" src={doc} alt="" onClick={onClick} />

      <img
        id="del"
        src={trash}
        alt=""
        style={{ margin: "auto", width: "24px", height: "20px" }}
        onClick={onClick}
      />
    </div>
  );
};
