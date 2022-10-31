import React from "react";

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
                <th>Manage</th>
            </tr>
        </thead>
    );
}
