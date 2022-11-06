import React from "react";
import "../App.css";

export default function TableHeader({ table }) {
    return (
        <thead>
            <tr>
                <th>Index</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Current Inventory</th>
                <th>Wanted Inventory</th>
                <th>Price</th>
                <th>Manage</th>
            </tr>
        </thead>
    );
}
