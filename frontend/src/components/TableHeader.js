import React from "react";
import Table from "react-bootstrap/Table";
import App from "../App.css";

export default function TableHeader({ table }) {
    return (
        <thead>
            <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Genre</th>
                <th>Current Inventory</th>
                <th>Wanted Inventory</th>
                <th>Price</th>
                <th>Edit</th>
            </tr>
        </thead>
    );
}
