import React, { useState, useEffect } from "react";
import "./App.css";
import { DataTable } from "./components/DataTable";

function App() {
  const [data, setData] = useState([]);
  const [queryTerm, setQueryTerm] = useState("");
  const [searchColumns, setSearchColumns] = useState(["firstName", "lastName"]);

  const columns = data[0] ? Object.keys(data[0]) : null;

  const url =
    "https://devmentor.live/api/examples/contacts.json?api_key=70c676c1";

  const handleUpdateQueryTerm = (event) => {
    setQueryTerm(event.target.value);
  };

  const handleUpdateSearchColumns = (event) => {
    const column = event.target.id;
    const isChecked = searchColumns.includes(column);
    setSearchColumns((prev) =>
      isChecked ? prev.filter((sc) => sc !== column) : [...prev, column]
    );
  };

  const searchData = (rows) => {
    return rows.filter((row) =>
      searchColumns.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(queryTerm.toLowerCase()) > -1
      )
    );
  };

  useEffect(async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
  }, []);

  return (
    <div className="App">
      <h1>
        Sample <mark>user</mark> data
      </h1>
      <input
        type="search"
        placeholder="search for first name, last name, email, address, etc."
        onChange={handleUpdateQueryTerm}
      />
      {columns
        ? columns.map((column, index) => {
            return (
              <div>
                <input
                  type="checkbox"
                  key={index}
                  id={column}
                  name={column}
                  checked={searchColumns.includes(column)}
                  onChange={handleUpdateSearchColumns}
                />
                <label for={column}>{column}</label>
              </div>
            );
          })
        : () => {}}
      <DataTable data={searchData(data)} />
    </div>
  );
}

export default App;
