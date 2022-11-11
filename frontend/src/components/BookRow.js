import React from "react";
import "../App.css";
export default function BookRow({ book, number, setBook, setShow }) {
    function click(e) {
        e.preventDefault();
        setBook(book);
        setShow(true);
    }
    return (
        <tr>
            <td>{number}</td>
            <td>{book.Title}</td>
            <td>{book.Genre}</td>
            <td className="Inventory">{book.Inventory}</td>
            <td>${book.Price}</td>
            <td>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => click(e)}
                >
                    Edit
                </button>
            </td>
        </tr>
    );
}
