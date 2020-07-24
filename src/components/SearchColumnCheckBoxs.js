import React from "react";

const ColumnsToSearchCheckBox = ({
  columns,
  checkedColumns,
  handleUpdateColumnsToSearch,
}) => {
  console.log("[ColumnsToSearchCheckBoxs] is running");
  return (
    <div>
      {columns
        ? columns.map((column, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  key={index}
                  id={column}
                  name={column}
                  checked={checkedColumns.includes(column)}
                  onChange={handleUpdateColumnsToSearch}
                />
                <label htmlFor={column}>{column}</label>
              </div>
            );
          })
        : () => {}}
    </div>
  );
};

const columnsToSearchAreNotUpdated = (prevColumns, nextColumns) => {
  if (!prevColumns.columns) {
    return false;
  }

  return prevColumns.checkedColumns === nextColumns.checkedColumns;
};

const MColumnsToSearchCheckBox = React.memo(
  ColumnsToSearchCheckBox,
  columnsToSearchAreNotUpdated
);

export { MColumnsToSearchCheckBox };
