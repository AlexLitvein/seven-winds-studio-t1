import React, { useState, useEffect } from 'react';
import { RowMenu } from './RowMenu';
import { ITreeItemProps, ITreeViewProps } from './TreeView.types';
import './TreeView.style.scss';
// import { IFetchData } from '../../api/api.types';

type AnyObj = { [x: string]: any };

export const TreeView = ({ dataDef, data, onClick }: ITreeViewProps) => {
  return (
    <ul className='tree'>
      <TreeItem
        dataDef={dataDef}
        key={-1}
        data={{ name: 'Level', child: [] as AnyObj[] } as AnyObj}
        parent={undefined}
        level={0}
        // i={gIdx}
        onClick={onClick}
      />
      {data.map((el, idx) => {
        return (
          <TreeItem
            dataDef={dataDef}
            key={idx}
            data={el}
            parent={data}
            level={0}
            // i={++gIdx}
            onClick={onClick}
          />
        );
      })}
    </ul>
  );
};

export const TreeItem = ({ dataDef, data, parent, level, onClick }: ITreeItemProps) => {
  let [isHidden, set_isHidden] = useState(false);
  // let [cls, set_cls] = useState("");
  // let [gi, set_gi] = useState(gIdx++);

  return (
    <li>
      <div>
        <RowMenu
          level={level++}
          isNode={data.child.length !== 0 || parent === undefined}
          onClick={(event) => {
            if (event.currentTarget.id === 'folder1') {
              set_isHidden(!isHidden);
            }
            onClick(event.currentTarget.id, data, parent);
          }}
        />
        {data.name}
      </div>
      {!isHidden && data.child.length !== 0 && (
        <ul>
          {data[dataDef.childField].map((el: AnyObj, idx: number) => (
            <TreeItem
              dataDef={dataDef}
              key={idx}
              data={el}
              parent={data}
              level={level}
              // i={++gIdx}
              onClick={onClick}
            />
          ))}

          {/* {data.child.map((el, idx) => (
            <TreeItem
              key={idx}
              data={el}
              parent={data}
              level={level}
              // i={++gIdx}
              onClick={onClick}
            />
          ))} */}
        </ul>
      )}
    </li>
  );
};
