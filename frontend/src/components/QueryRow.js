import React from "react";
import "../App.css";
export default function QueryRow({ book }) {
    const add = (e) => {
        e.preventDefault();
        console.log("added");
    };

    return (
        <tr>
            <td>{book.title}</td>
            <td>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => add(e)}
                >
                    Add
                </button>
            </td>
        </tr>
    );
}
