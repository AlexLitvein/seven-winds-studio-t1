import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { ITableProps, IRowProps, ICellProps, ITableHeaderProps, CellClick } from './TableView.types';
import './TableView.style.scss';
import { TreeView } from '../TreeView';
import { createFakeData, IFetchData } from '../../fetch';

export const TableView = ({ table, data }: ITableProps) => {
  let key = 0;
  let [trig, set_trig] = useState(false); // только для отрисовки

  console.log('Table->', {
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

  const onCellClick: CellClick = (
    cellName: string,
    value: string | number,
    row: IFetchData | undefined,
    isDblClick: boolean
  ) => {
    table.selectedData = { row, cellName, isEdit: isDblClick };
    set_trig(!trig);
  };

  const onTreeViewItemMenuClick = (idElm: string, elm: IFetchData, parent: IFetchData | IFetchData[] | undefined) => {
    console.log({
      idElm,
      elm,
      parent,
    });

    switch (idElm) {
      case 'folder1':
        // set_hiddenData((prev) => ({
        //   elm: prev.elm?.id !== elm.id ? elm : undefined,
        //   parent,
        // }));
        table.hiddenData = {
          elm: table.hiddenData.elm?.id !== elm.id ? elm : undefined,
          parent,
        };
        break;

      case 'folder2':
        const tmp = createFakeData();
        tmp.child.push(createFakeData());
        if (parent) {
          elm.child.push(tmp);
        } else {
          data.push(tmp);
        }
        break;

      case 'doc':
        // elm.child.length !== 0 && elm.child.push(createFakeData());

        if (parent) {
          elm.child.length !== 0 && elm.child.push(createFakeData());
        } else {
          data.push(createFakeData());
        }
        break;

      case 'del':
        let whereFind: IFetchData[] | undefined = undefined;
        if (Array.isArray(parent)) {
          whereFind = parent;
        } else {
          whereFind = parent?.child;
        }

        if (whereFind) {
          const idx = whereFind.findIndex((el) => el.id === elm?.id);
          idx !== undefined && whereFind.splice(idx, 1);
          // set_hiddenData({ elm: undefined, parent: undefined });
          table.hiddenData = { elm: undefined, parent: undefined };
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
    //   table,
    //   // selectedData_id: selectedData?.id,
    // });

    return (
      //INFO: из-за этого (<></>)-> Warning: Each child in a list should have a unique "key" prop
      <>
        <Row
          key={key}
          data={data}
          onClick={onCellClick}
          // isSelected={selectedData.elm?.id === data.id}
          // isSelected={table.selectedData.row?.id === data.id}
          selData={table.selectedData}
          // selectedCellName={table.selectedData.cellName}
        />
        {table.hiddenData.elm?.id !== data.id && child.map((el, idx) => renderRow(key++, el))}
      </>
    );
  };

  return (
    <div className='table'>
      <div className='tree-panel'>
        <TreeView data={data} onClick={onTreeViewItemMenuClick} />
      </div>
      <div className='data-panel'>
        <TableHeader data={table.columnsNames} />
        {data.map((el, idx) => {
          return renderRow(key++, el); //INFO: ++ именно тут
        })}
      </div>
    </div>
  );
};

export const Row = ({
  data,
  selData,
  // isSelected,
  // selectedCellName,
  onClick,
}: IRowProps) => {
  const { child, ...objData } = data;

  return (
    <div className={`row${selData.row?.id === data.id ? ' row-selected' : ''}`}>
      {(Object.keys(objData) as Array<keyof typeof objData>).map((el, idx) => {
        return (
          <Cell
            key={idx}
            onClick={onClick}
            name={el}
            row={data}
            isSelected={selData.cellName === el}
            value={objData[el]}
            isEdit={selData.row?.id === data.id && selData.cellName === el && selData.isEdit}
          />
        );
      })}
    </div>
  );
};

export const TableHeader = ({ data }: ITableHeaderProps) => {
  return (
    <div className='row'>
      {data.map((el, idx) => (
        <Cell
          key={idx}
          onClick={() => {}}
          name={el.toString()}
          value={el}
          isSelected={false}
          row={undefined}
          isEdit={false}
        />
      ))}
    </div>
  );
};

export const Cell = ({ name, row, isSelected, isEdit, value, onClick }: ICellProps) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      // setUpdated(message);
      console.log('onKeyDown');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setInputValue(event.target.value);
    console.log('change');
  };

  return (
    <div
      id={name}
      // className={`column${isSelected && !isEdit ? " column-selected" : ""}`}
      className={`column${isSelected ? ' column-selected' : ''}`}
      onClick={() => onClick(name, value, row, false)}
      onDoubleClick={() => onClick(name, value, row, true)}
    >
      {isEdit ? <input type='text' autoFocus value={value} onChange={handleChange} onKeyDown={handleKeyDown} /> : value}
    </div>
  );
};
