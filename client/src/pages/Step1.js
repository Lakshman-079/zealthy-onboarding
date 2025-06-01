import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Step.css"; 

function Step1() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        setError("Both fields are required");
        return;
      }

      const res = await axios.post("http://localhost:5000/users", {
        email,
        password,
      });

      console.log("User created:", res.data);
      localStorage.setItem("userId", res.data._id);
      navigate("/page2");
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to create user. Check backend or try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="steps">
          <div className="step active">1</div>
          <div className="line"></div>
          <div className="step">2</div>
          <div className="line"></div>
          <div className="step">3</div>
        </div>
        <h2>User Onboarding</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSubmit}>Next</button>
      </div>
    </div>
  );
}

export default Step1;
