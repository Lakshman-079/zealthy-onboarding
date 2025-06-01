import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Step.css";

function Step3() {
  const [config, setConfig] = useState([]);
  const [address, setAddress] = useState({ street: "", city: "", state: "", zip: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/admin/config").then(res => {
      setConfig(res.data.page3);
    });
  }, []);

  const handleFinish = async () => {
    const userId = localStorage.getItem("userId");
    await axios.put(`http://localhost:5000/users/${userId}`, { address, step: 3 });
    alert("Onboarding Complete");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="steps">
          <div className="step">1</div>
          <div className="line"></div>
          <div className="step">2</div>
          <div className="line"></div>
          <div className="step active">3</div>
        </div>
        <h2>Step 3</h2>
        {config.includes("address") && (
          <>
            <input placeholder="Street" onChange={(e) => setAddress({ ...address, street: e.target.value })} />
            <input placeholder="City" onChange={(e) => setAddress({ ...address, city: e.target.value })} />
            <input placeholder="State" onChange={(e) => setAddress({ ...address, state: e.target.value })} />
            <input placeholder="Zip" onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
          </>
        )}
        <button onClick={handleFinish}>Finish</button>
      </div>
    </div>
  );
}

export default Step3;