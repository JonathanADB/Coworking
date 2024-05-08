import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import { ResetPassword } from "../pages/ResetPassword.jsx";
import ValidateUser from "../pages/ValidateUser.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/validate" element={<ValidateUser />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
