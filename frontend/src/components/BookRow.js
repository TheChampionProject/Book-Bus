import React from "react";
import Popup from "./Popup.js";
import App from "../App.css";
export default function BookRow({ book, index }) {
    function click() {
        console.log("clicked");
    }
    return (
        <>
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
        </>
    );
}
