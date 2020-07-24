import React from "react";
import { Highlight } from "../utils/Highlight";

const DataTable = ({ data, toHighlight, searchColumns }) => {
  const columns = data[0] && Object.keys(data[0]);
  console.log(`[DataTable] is running`);

  return (
    <table>
      <thead>
        <tr>
          {columns
            ? columns.map((column, index) => {
                return <th key={index}>{column}</th>;
              })
            : () => {}}
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((row, index) => {
              return (
                <tr key={index}>
                  {columns.map((column) => {
                    return (
                      <td key={`${index}-${column}`}>
                        <Highlight
                          text={row[column].toString()}
                          highlight={toHighlight}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })
          : () => {}}
      </tbody>
    </table>
  );
};

const DataTableNotUpdated = (prevDataTable, nextDataTable) => {
  if (
    !prevDataTable.toHighlight &&
    prevDataTable.columnsToSearch === nextDataTable.columnsToSearch
  ) {
    return false;
  }
  return prevDataTable.toHighlight === nextDataTable.toHighlight;
};

const MDataTable = React.memo(DataTable, DataTableNotUpdated);

export { MDataTable };
