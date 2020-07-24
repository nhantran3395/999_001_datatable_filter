import React, { useState, useEffect } from "react";
import { MDataTable } from "./components/DataTable";
import { MColumnsToSearchCheckBox } from "./components/SearchColumnCheckBoxs";

function App() {
  const [data, setData] = useState([]);
  const [queryTerm, setQueryTerm] = useState("");
  const [columnsToSearch, setColumnsToSearch] = useState([
    "firstName",
    "lastName",
  ]);

  const url =
    "https://devmentor.live/api/examples/contacts.json?api_key=70c676c1";

  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(url);
      const jsonData = await response.json();
      setData(jsonData);
    }

    fetchUserData();
  }, []);

  const handleUpdateQueryTerm = (event) => {
    setQueryTerm(event.target.value);
  };

  const handleUpdateColumnsToSearch = (event) => {
    const column = event.target.id;
    const isChecked = columnsToSearch.includes(column);
    setColumnsToSearch((prev) =>
      isChecked ? prev.filter((sc) => sc !== column) : [...prev, column]
    );
  };

  const columns = data[0] ? Object.keys(data[0]) : null;

  const searchData = (rows) => {
    console.log(`[searchData function is triggered]`);
    return data.filter((row) =>
      columnsToSearch.some(
        (column) =>
          row[column]
            .toString()
            .toLowerCase()
            .indexOf(queryTerm.toLowerCase()) > -1
      )
    );
  };

  return (
    <div className="App">
      <h1>Sample user data</h1>
      <input
        type="search"
        placeholder="search for first name, last name, email, address, etc."
        onChange={handleUpdateQueryTerm}
      />
      <MColumnsToSearchCheckBox
        columns={columns}
        checkedColumns={columnsToSearch}
        handleUpdateColumnsToSearch={handleUpdateColumnsToSearch}
      />
      <MDataTable
        data={searchData(data)}
        queryTerm={queryTerm}
        columnsToSearch={columnsToSearch}
      />
    </div>
  );
}

export default App;
