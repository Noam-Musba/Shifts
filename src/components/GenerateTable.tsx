import React, { useRef } from "react";
import { useTable } from "react-table";
import "./table.css";
import { toBlob } from "html-to-image";
import { saveAs } from "file-saver";

type GenerateTableProps = {
  columns: {
    Header: string;
    accessor: string;
  }[];
  data: {
    [key: string]: string;
  }[];
  downloadButton: boolean;
};

export const GenerateTable = (props: GenerateTableProps) => {
  const tableRef = useRef<HTMLTableElement>(null);

  const handleDownloadImage = async () => {
    if (tableRef.current) {
      toBlob(tableRef.current).then(function (blob) {
        if (blob) {
          saveAs(blob, "shifts_table.png");
        }
      });
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: props.columns,
      data: props.data,
    });

  return (
    <div>
      <table className="mb-3" ref={tableRef} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.downloadButton && <button className="btn btn-primary mb-3" onClick={handleDownloadImage}>Download Table as Image</button>}
    </div>
  );
};
