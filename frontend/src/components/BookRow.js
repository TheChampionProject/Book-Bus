import React from "react";
import Popup from "./Popup.js";
import App from "../App.css";
export default function BookRow({ book, index }) {
    let editButton = React.useRef();
    let showPopup = false

    editButton = () => {
        showPopup = !showPopup
        console.log(showPopup)
    };
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
                        onClick={editButton}
                    >
                        Edit
                    </button>
                </td>
                <td>
                    <Popup show={showPopup} />
                </td>
            </tr>
        </>
    );
}
