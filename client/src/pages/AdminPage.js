import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Step.css";

function AdminPage() {
  const [config, setConfig] = useState({ page2: [], page3: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/admin/config").then((res) => {
      setConfig(res.data);
    });
  }, []);

  const toggleComponent = (page, component) => {
    const current = config[page];
    const updated = current.includes(component)
      ? current.filter((item) => item !== component)
      : [...current, component];
    setConfig({ ...config, [page]: updated });
  };

  const saveConfig = () => {
    if (config.page2.length < 1 || config.page3.length < 1) {
      alert("Each page must have at least one component");
      return;
    }
    axios.post("http://localhost:5000/admin/config", config);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Config</h2>

        <h3>Page 2</h3>
        {['about', 'birthdate'].map((item) => (
          <label key={item} style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={config.page2.includes(item)}
              onChange={() => toggleComponent("page2", item)}
            /> {item}
          </label>
        ))}

        <h3>Page 3</h3>
        {['address'].map((item) => (
          <label key={item} style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="checkbox"
              checked={config.page3.includes(item)}
              onChange={() => toggleComponent("page3", item)}
            /> {item}
          </label>
        ))}

        <button onClick={saveConfig}>Save Config</button>
      </div>
    </div>
  );
}

export default AdminPage;