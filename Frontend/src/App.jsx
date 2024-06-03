import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "../src/pages/Auth/Auth.jsx";
import { Toaster } from "react-hot-toast";
import Adminportal from "./pages/Admin/Adminportal/Adminportal.jsx";
import Dashboard from "./pages/Admin/Dashboard/Dashboard.jsx";
import Analytics from "./pages/Admin/Analytics/Analytics.jsx";
import Quizanalysis from "./components/Quizanalysis/Quizanalysis.jsx";
// import Quiz from "./pages/Quiz/Quiz.jsx";
import Quizattempt from "./pages/Quizattempt/Quizattempt.jsx";
import Qaquiz from "./pages/Quizattempt/Qaquiz.jsx";
import Notfound from "./pages/Notfound/Notfound.jsx";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="/" element={<Adminportal />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="/analysis/:id" element={<Quizanalysis />} />
          </Route>
          <Route path="/poll/:id" element={<Quizattempt />} />
          <Route path="/quiz/:id" element={<Qaquiz />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" />
    </>
  );
};

export default App;
