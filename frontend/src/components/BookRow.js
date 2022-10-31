import React from "react";
import Popup from "./Popup.js";

export default function BookRow({ book, index }) {
    let editButton = React.useRef();

    editButton = () => {
        <Popup show={true}/>;
    };
    return (
        <tr>
            <td>{index}</td>
            <td>{book.Title}</td>
            <td>{book.Genre}</td>
            <td>{book.Inventory}</td>
            <td>{book.InventoryWanted}</td>
            <td>{book.Price}</td>
            <td>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={editButton}
                >
                    Edit
                </button>
            </td>
        </tr>
    );
}
