import ReactDOM from "react-dom/client";
import ManagePage from "./pages/ManagePage.js";
import GiftPage from "./pages/GiftPage.js";
import DonatePage from "./pages/DonatePage.js";
import HomePage from "./pages/HomePage.js";
import StatsPage from "./pages/StatsPage.js";
import AdminPage from "./pages/AdminPage.js";
import AdminList from "./pages/AdminList"
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import AuthPage from "./pages/AuthPage.js";
import VerifyList from "./pages/VerifyList.js";
import Verification from "./pages/Verification.js"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router>
        <Routes>
            <Route path="/login" element={<AuthPage />} />
            <Route path="/manage" element={<ManagePage />} />
            <Route path="/gift" element={<GiftPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/*" element={<DonatePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/verifylist" element={<VerifyList />} />
            <Route path="/adminlist" element={<AdminList />} />
            <Route path="/verify" element={<Verification />} />
        </Routes>
    </Router>
);
