import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import Login from "../src/pages/auth/Login";
import Register from "../src/pages/auth/Register";
import Forget from "../src/pages/auth/Forget";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<Forget />} />
    </Routes>
  );
};

export default AppRoutes;
