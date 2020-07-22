import React from "react";

const DataTable = ({ data }) => {
  const headers = data[0] && Object.keys(data[0]);

  return (
    <table>
      <thead>
        <tr>
          {headers
            ? headers.map((header, index) => {
                return <th key={index}>{header}</th>;
              })
            : () => {}}
        </tr>
      </thead>
      <tbody>
        {data
          ? data.map((row, index) => {
              return (
                <tr key={index}>
                  {headers.map((header) => {
                    return <td key={`${index}-${header}`}>{row[header]}</td>;
                  })}
                </tr>
              );
            })
          : () => {}}
      </tbody>
    </table>
  );
};

export { DataTable };
