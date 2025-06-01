import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Step.css";

function Step2() {
  const [config, setConfig] = useState([]);
  const [about, setAbout] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/admin/config").then(res => {
      setConfig(res.data.page2);
    });
  }, []);

  const handleNext = async () => {
    const userId = localStorage.getItem("userId");
    await axios.put(`http://localhost:5000/users/${userId}`, { about, birthdate, step: 2 });
    navigate("/page3");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="steps">
          <div className="step">1</div>
          <div className="line"></div>
          <div className="step active">2</div>
          <div className="line"></div>
          <div className="step">3</div>
        </div>
        <h2>Step 2</h2>
        {config.includes("about") && (
          <textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="About Me" />
        )}
        {config.includes("birthdate") && (
          <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
        )}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Step2