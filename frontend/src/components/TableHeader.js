import React from "react";
import "../App.css";

export default function TableHeader({ mode }) {
    return (
        <thead className="TopBar">
           
            <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Store</th>
                <th>Price</th>
                <th style={{ display: mode === "gift" ? "none" : "" }}>Edit</th>
                <th style={{ display: mode === "gift" ? "" : "none" }}>Gift</th>
            </tr>
        </thead>
    );
}
