import ReactDOM from "react-dom/client";
import LoginPage from "./pages/LoginPage.js"
import Library from "./pages/Library.js"
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/library" element={<Library />} /> 
        </Routes>
    </Router>
);
