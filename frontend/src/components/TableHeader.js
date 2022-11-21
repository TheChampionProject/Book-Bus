import React from "react";
import "../App.css";

export default function TableHeader({ mode }) {
    return (
        <thead>
            <tr>
                <th className="TableHeaderCell">Title</th>
                <th className="BiggerCell TableHeaderCell">Genre</th>
                <th className="TableCell TableHeaderCell">Stock</th>
                <th className="TableCell TableHeaderCell">Price</th>
                <th
                    style={{ display: mode === "gift" ? "none" : "" }}
                    className="TableCell TableHeaderCell"
                >
                    Edit
                </th>
                <th
                    style={{ display: mode === "gift" ? "" : "none" }}
                    className="TableCell TableHeaderCell"
                >
                    Gift
                </th>
            </tr>
        </thead>
    );
}
