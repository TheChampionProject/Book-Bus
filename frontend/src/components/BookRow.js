import React from "react";
import "../App.css";
export default function BookRow({
    book,
    setBook,
    setShowEditPopup,
    mode,
    setShowGC,
}) {
    let textColor,
        button,
        AMAZON_BASE_URL = "https://www.amazon.com/s?k=";

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

    const buy = (e) => {
        e.preventDefault();
        window.open(AMAZON_BASE_URL + book.Title, "_blank");
    };

    if (mode === "gift") {
        button = (
            <button
                className="btn btn-primary my-2 EditButton"
                onClick={(e) => gift(e)}
            >
                Gift
            </button>
        );
    } else if (mode === "manage") {
        button = (
            <button
                className="btn btn-primary my-2 EditButton"
                onClick={(e) => edit(e)}
            >
                Edit
            </button>
        );
    } else
        button = (
            <button
                className="btn btn-primary my-2 EditButton"
                onClick={(e) => buy(e)}
            >
                Buy
            </button>
        );

    if (book.Needed >= 5 && book.Needed < 10) textColor = "#BDB76B";
    else if (book.Needed >= 10 && book.Needed < 20) textColor = "orange";
    else if (book.Needed >= 20) textColor = "red";

    return (
        <tr>
            <td style={{ color: textColor }}>{book.Title}</td>
            <td>{book.Genre}</td>
            <td className="Inventory">{book.Inventory}</td>
            <td>${book.Price}</td>
            <td> {button}</td>
        </tr>
    );
}
