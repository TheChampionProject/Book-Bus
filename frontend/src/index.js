import ReactDOM from "react-dom/client";
import Library from "./pages/Library.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<Library />} />
        </Routes>
    </Router>
);
