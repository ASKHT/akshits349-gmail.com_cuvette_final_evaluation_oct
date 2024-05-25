import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../src/pages/Auth/Auth.jsx";
import { Toaster } from "react-hot-toast";
import Adminportal from "./pages/Admin/Adminportal/Adminportal.jsx";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx";
import Analytics from "./pages/Admin/Analytics/Analytics.jsx";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="/" element={<Adminportal />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
