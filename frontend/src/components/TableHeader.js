import React from "react";
import "../App.css";

export default function TableHeader({mode}) {
    return (
        <thead>
            <tr>
                <th>Index</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Store</th>
                <th>Price</th>
                <th>Edit</th>
                <th style={{ display: mode === "gift" ? "" : "none" }}>
                    Gift
                </th>
            </tr>
        </thead>
    );
}
