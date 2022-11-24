import React from "react";
import "../App.css";

export default function TableHeader({ mode }) {
    let lastCell;

    if (mode === "gift") {
        lastCell = <th className="TableCell TableHeaderCell">Gift</th>;
    } else if (mode === "manage") {
        lastCell = <th className="TableCell TableHeaderCell">Edit</th>;
    } else lastCell = <th className="TableCell TableHeaderCell">Buy</th>;

    return (
        <thead>
            <tr>
                <th className="TableHeaderCell">Title</th>
                <th className="BiggerCell TableHeaderCell">Genre</th>
                <th className="TableCell TableHeaderCell">Stock</th>
                <th className="TableCell TableHeaderCell">Price</th>
                {lastCell}
            </tr>
        </thead>
    );
}
