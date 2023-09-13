import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Registration from "./components/Registration";
import Login from "./components/Login";
import Admin from "./components/Admin";
import User from "./components/User";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user/*" element={<User />} />
      </Routes>
    </div>
  );
};

export default App;
