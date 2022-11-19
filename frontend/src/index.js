import ReactDOM from "react-dom/client";
import ManagePage from "./pages/ManagePage.js";
import GiftPage from "./pages/GiftPage.js";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/manage" element={<ManagePage />} />
            <Route path="/gift" element={<GiftPage />} />
        </Routes>
    </Router>
);
