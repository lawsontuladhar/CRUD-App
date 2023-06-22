import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function ClientTable() {
  const [clientData, setClientData] = useState(
    JSON.parse(localStorage.getItem("formData")) ?? []
  );
  const [isSorted, setIsSorted] = useState(false);
  const [sort, setSort] = useState();
  const [sortedData, setSortedData] = useState();

  const handleDelete = (id) => {
    const updatedData = clientData.filter((data) => data.id !== id);
    localStorage.setItem("formData", JSON.stringify(updatedData));
    setClientData(updatedData);
  };

  const handleSort = () => {
    setIsSorted(true);
    const data = [...clientData];
    if (sort === "ASC") {
      data.sort((a, b) =>
        a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? -1 : 1
      );

      setSort("DESC");
      setSortedData(data);
    } else {
      data.sort((a, b) =>
        a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase() ? 1 : -1
      );
      setSortedData(data);
      setSort("ASC");
    }
  };

  const clearFilter = () => {
    setIsSorted(false);
    setSort(undefined);
    setSortedData(undefined);
  };

  const renderData = isSorted ? sortedData : clientData;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <span onClick={handleSort}>
                Name {isSorted ? (sort == "ASC" ? "⬆️" : "⬇️") : null}
              </span>
              {isSorted ? (
                <span className="clear-filter" onClick={clearFilter}>
                  ❌
                </span>
              ) : null}
            </th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>phone</th>
            <th>address</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {!renderData ? (
            <tr>
              <td>No Data found</td>
            </tr>
          ) : (
            renderData.map((client) => {
              return (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.dob}</td>
                  <td>{client.phone}</td>
                  <td>{`${client.province}-${client.city} ${client.district}, ${client.country}`}</td>
                  <td>
                    <div className="table_actions">
                      <Link to={`/user/${client.id}/edit`}>
                        <button>Edit</button>
                      </Link>
                      <button onClick={() => handleDelete(client.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>
  );
}

export default ClientTable;
