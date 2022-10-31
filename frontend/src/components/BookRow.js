import React from "react";

export default function BookRow({ book, index }) {
    return (
        <tr>
            <td>{index}</td>
            <td>{book.Title}</td>
            <td>{book.Genre}</td>
            <td>{book.Inventory}</td>
            <td>{book.InventoryWanted}</td>
            <td>{book.Price}</td>
        </tr>
    );
}
