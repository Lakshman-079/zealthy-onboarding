import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Step.css";

function DataTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="container">
      <div className="card" style={{ overflowX: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Data</h2>
        <table
          style={{
            width: "100%",
            color: "white",
            borderCollapse: "collapse",
            minWidth: "600px",
          }}
        >
          <thead>
            <tr>
              <th style={headerStyle}>Email</th>
              <th style={headerStyle}>About</th>
              <th style={headerStyle}>Birthdate</th>
              <th style={headerStyle}>Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const fullAddress = u.address
                ? [u.address.street, u.address.city, u.address.state, u.address.zip]
                    .filter(Boolean)
                    .join(", ")
                : "-";

              return (
                <tr key={u._id}>
                  <td style={fullCellStyle}>{u.email}</td>
                  <td style={fullCellStyle}>{u.about || "-"}</td>
                  <td style={fullCellStyle}>{u.birthdate || "-"}</td>
                  <td style={fullCellStyle}>{fullAddress}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const headerStyle = {
  padding: "10px",
  textAlign: "left",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

const fullCellStyle = {
  padding: "8px 10px",
  whiteSpace: "normal", 
  wordBreak: "break-word", 
};

export default DataTable;
