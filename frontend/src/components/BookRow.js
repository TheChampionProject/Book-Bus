import React from "react";
import "../App.css";
export default function BookRow({ book, index, setBook, setShow }) {
    function click() {
        setBook([book, index]);
        setShow(true);
    }
    return (
        <tr>
            <td>{index}</td>
            <td>{book.Title}</td>
            <td>{book.Genre}</td>
            <td className="Inventory">{book.Inventory}</td>
            <td className="Inventory">{book.InventoryWanted}</td>
            <td>${book.Price}</td>
            <td>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={click}
                >
                    Edit
                </button>
            </td>
        </tr>
    );
}
