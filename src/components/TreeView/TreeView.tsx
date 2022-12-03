import React, { useState, useEffect } from "react";
import { RowMenu } from "./RowMenu";
import { ITreeItemProps, ITreeViewProps } from "./TreeView.types";
import { IFetchData } from "../../fetch";
import "./TreeView.style.scss";

export const TreeView = ({ data, onClick }: ITreeViewProps) => {
  return (
    <ul className="tree">
      <TreeItem
        key={-1}
        data={{ rowName: "Level", child: [] as IFetchData[] } as IFetchData}
        level={0}
        // i={gIdx}
        onClick={onClick}
      />
      {data.map((el, idx) => {
        return (
          <TreeItem
            key={idx}
            data={el}
            level={0}
            // i={++gIdx}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};

export const TreeItem = ({ data, level, onClick }: ITreeItemProps) => {
  let [isHidden, set_isHidden] = useState(false);
  // let [cls, set_cls] = useState("");
  // let [gi, set_gi] = useState(gIdx++);

  return (
    <li>
      <div>
        <RowMenu
          level={level++}
          isNode={data.child.length !== 0}
          onClick={(event) => {
            // if (!event.currentTarget.previousElementSibling) {
            //   set_isHidden(!isHidden);
            // }
            // else {
            //   onClick(event.currentTarget.id, data);
            // }

            if (event.currentTarget.id === "folder1") {
              set_isHidden(!isHidden);
            }
            onClick(event.currentTarget.id, data);
          }}
        />
        {data.rowName}
      </div>
      {!isHidden && data.child.length !== 0 && (
        <ul>
          {data.child.map((el, idx) => (
            <TreeItem
              key={idx}
              data={el}
              level={level}
              // i={++gIdx}
              onClick={onClick}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
