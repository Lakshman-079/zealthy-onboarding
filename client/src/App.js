import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Step1 from "./pages/Step1";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import AdminPage from "./pages/AdminPage";
import DataTable from "./pages/DataTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/page2" element={<Step2 />} />
        <Route path="/page3" element={<Step3 />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/data" element={<DataTable />} />
      </Routes>
    </Router>
  );
}
export default App;
