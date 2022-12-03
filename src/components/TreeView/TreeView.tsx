import React, { useState, useEffect } from "react";
import { RowMenu } from "./RowMenu";
import { ITreeItemProps, ITreeViewProps } from "./TreeView.types";
import "./TreeView.style.scss";
import { Entity } from "../../App";
import { IFetchData } from "../../fetch";

export const TreeView = ({ data }: ITreeViewProps) => {
  let [trig, set_trig] = useState(false); // только для отрисовки

  const onItemMenuClick = (idElm: string, data: IFetchData) => {
    // console.log({
    //   idElm_log: idElm,
    // });
    switch (idElm) {
      case "doc":
        // data.child.push({ name: "name new", child: [] });
        break;

      case "folder2":
        // data.child.push({
        //   name: "name new",
        //   child: [{ name: "name new2", child: [] }],
        // });
        break;

      default:
        break;
    }
    set_trig(!trig);
  };

  return (
    <ul className="tree">
      <TreeItem
        key={-1}
        data={{ rowName: "Level", child: [] as IFetchData[] } as IFetchData}
        level={0}
        onClick={onItemMenuClick}
      />
      {data.map((el, idx) => {
        return (
          <TreeItem key={idx} data={el} level={0} onClick={onItemMenuClick} />
        );
      })}
    </ul>
  );

  // return (
  //   <ul className="tree">
  //     { data.child.map((el, idx) => {
  //       return (
  //         <TreeItem key={idx} data={el} level={0} onClick={onItemMenuClick} />
  //       );
  //     })}
  //   </ul>
  // );
};

export const TreeItem = ({ data, level, onClick }: ITreeItemProps) => {
  let [isHidden, set_isHidden] = useState(false);
  let [cls, set_cls] = useState("");

  return (
    <li>
      <div>
        <RowMenu
          level={level++}
          isNode={data.child.length !== 0}
          onClick={(event) => {
            if (!event.currentTarget.previousElementSibling) {
              set_isHidden(!isHidden);
            } else {
              onClick(event.currentTarget.id, data);
            }
          }}
        />
        {data.rowName}
      </div>
      {!isHidden && data.child.length !== 0 && (
        <ul className={cls}>
          {data.child.map((el, idx) => (
            <TreeItem key={idx} data={el} level={level} onClick={onClick} />
          ))}
        </ul>
      )}
    </li>
  );
};
