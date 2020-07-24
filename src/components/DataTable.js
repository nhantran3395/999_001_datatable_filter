import React from "react";
import { Highlight } from "../utils/Highlight";

const DataTable = ({ data, queryTerm, columnsToSearch }) => {
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
                    if (!columnsToSearch.includes(column)) {
                      return (
                        <td key={`${index}-${column}`}>
                          <span>{row[column]}</span>
                        </td>
                      );
                    }

                    return (
                      <td key={`${index}-${column}`}>
                        <Highlight
                          text={row[column].toString()}
                          highlight={queryTerm}
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
  // when columnsToSearch is altered but queryTerm is null,
  // forcily block DataTable from rerendering.

  if (
    !prevDataTable.queryTerm &&
    prevDataTable.data === nextDataTable.data &&
    prevDataTable.columnsToSearch !== nextDataTable.columnsToSearch
  ) {
    return true;
  }

  return (
    prevDataTable.data === nextDataTable.data &&
    prevDataTable.columnsToSearch === nextDataTable.columnsToSearch
  );
};

const MDataTable = React.memo(DataTable, DataTableNotUpdated);

export { MDataTable };
