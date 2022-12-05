import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { ITableProps, IRowProps, ICellProps, ITableHeaderProps, CellClickCb, ICellIputProps } from './TableView.types';
import './TableView.style.scss';
import { TreeView } from '../TreeView';
import { createFakeData } from '../../utils';
import { IFetchData } from '../../api/api.types';

export const TableView = ({ table }: ITableProps<IFetchData>) => {
  const data = table.data;
  let key = 0;
  let [trig, set_trig] = useState(false); // только для отрисовки

  // const [result, state] = fetchData2();

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

  const onCellClick: CellClickCb = (cellName, value, row, isDblClick) => {
    table.selectedData = { row, cellName, isEdit: isDblClick, value };
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
        <Row key={key} data={data} onClick={onCellClick} selData={table.selectedData} />
        {table.hiddenData.elm?.id !== data.id && child.map((el, idx) => renderRow(key++, el))}
      </>
    );
  };

  return (
    <div className='table'>
      {/* {state.isPending}
      <>{console.log('result: ', result)}</> */}

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

export const Row = ({ data, selData, onClick }: IRowProps) => {
  const { child, ...objData } = data;

  return (
    <div className={`row${selData.row?.id === data.id ? ' row-selected' : ''}`}>
      {(Object.keys(objData) as Array<keyof typeof objData>).map((el, idx) => {
        return (
          <Cell
            key={idx}
            onClick={onClick}
            onEnter={(name, value, row) => {
              // @ts-ignore
              data[name] = value;
              onClick(name, value, row, false);
            }}
            name={el}
            row={data}
            isSelected={selData.cellName === el}
            value={objData[el].toString()}
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
          value={el.toString()}
          isSelected={false}
          row={undefined}
          isEdit={false}
          onEnter={() => {}}
        />
      ))}
    </div>
  );
};

export const Cell = ({ name, row, isSelected, isEdit, value, onClick, onEnter }: ICellProps) => {
  return (
    <div
      id={name}
      // className={`column${isSelected && !isEdit ? " column-selected" : ""}`}
      className={`column${isSelected ? ' column-selected' : ''}`}
      onClick={() => onClick(name, value, row, false)}
      onDoubleClick={() => onClick(name, value, row, true)}
    >
      {/* {isEdit ? <input type='text' autoFocus value={value} onChange={handleChange} onKeyDown={handleKeyDown} /> : value} */}
      {isEdit ? <CellIput value={value} onEnter={(value) => onEnter(name, value, row)} /> : value}
    </div>
  );
};

export const CellIput = ({ value, onEnter }: ICellIputProps) => {
  let [text, set_text] = useState(value);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      onEnter(text);
      console.log('onKeyDown');
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    set_text(event.target.value);
    // onInput(event.target.value);
    // console.log('change');
  };

  return <input type='text' autoFocus value={text} onChange={handleChange} onKeyDown={handleKeyDown} />;
};
