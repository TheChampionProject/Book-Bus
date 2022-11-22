import React from "react";
import "../App.css";
export default function BookRow({
    book,
    setBook,
    setShowEditPopup,
    searchQuery,
    mode,
    setShowGC,
}) {
    let textColor, search;

    const edit = (e) => {
        e.preventDefault();
        setBook(book);
        setShowEditPopup(true);
    };

    const gift = (e) => {
        e.preventDefault();
        setBook(book);
        setShowGC(true);
    };

    if (book.Needed >= 5 && book.Needed < 10) textColor = "#BDB76B";
    else if (book.Needed >= 10 && book.Needed < 20) textColor = "orange";
    else if (book.Needed >= 20) textColor = "red";

    if (book.Inventory <= 0) search = false;

    if (book.Title.toLowerCase().startsWith(searchQuery.toLowerCase())) {
        search = true;
    }

    return (
        <tr style={{ display: search ? "" : "none" }}>
            <td style={{ color: textColor }}>{book.Title}</td>
            <td>{book.Genre}</td>
            <td className="Inventory">{book.Inventory}</td>
            <td>${book.Price}</td>
            <td style={{ display: mode === "gift" ? "none" : "" }}>
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => edit(e)}
                >
                    Edit
                </button>
            </td>
            <td
                style={{ display: mode === "gift" ? "" : "none" }}
                className="Inventory"
            >
                <button
                    className="btn btn-primary my-2 EditButton"
                    onClick={(e) => gift(e)}
                >
                    Gift
                </button>
            </td>
        </tr>
    );
}
