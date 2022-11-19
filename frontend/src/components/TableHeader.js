import React from "react";
import "../App.css";

export default function TableHeader({ mode }) {
    return (
        <thead className="TableHeader">
            <tr>
                <th>Title</th>
                <th className="BiggerCell">Genre</th>
                <th className="TableCell">Stock</th>
                <th className="TableCell">Price</th>
                <th
                    style={{ display: mode === "gift" ? "none" : "" }}
                    className="TableCell"
                >
                    Edit
                </th>
                <th
                    style={{ display: mode === "gift" ? "" : "none" }}
                    className="TableCell"
                >
                    Gift
                </th>
            </tr>
        </thead>
    );
}
