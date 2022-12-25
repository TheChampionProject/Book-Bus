import React from "react";
import "../App.css";

export default function TableHeader({ mode }) {
    let lastCell, neededOrGenre;

    if (mode === "gift") {
        lastCell = <th className="TableCell TableHeaderCell">Gift</th>;
        neededOrGenre = <th className="BiggerCell TableHeaderCell">Genre</th>;
    } else if (mode === "manage") {
        lastCell = <th className="TableCell TableHeaderCell">Edit</th>;
        neededOrGenre = <th className="BiggerCell TableHeaderCell GenreHeaderCell">Genre</th>;
    } else {
        lastCell = <th className="TableCell TableHeaderCell">Buy</th>;
        neededOrGenre = <th className="BiggerCell TableHeaderCell">Needed</th>;
    }

    return (
        <thead>
            <tr>
                <th className="TableHeaderCell">Title</th>
                {neededOrGenre}
                <th className="TableCell TableHeaderCell">Stock</th>
                {lastCell}
            </tr>
        </thead>
    );
}
