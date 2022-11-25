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
        AMAZON_BASE_URL = "https://www.amazon.com/s?k=",
        neededOrGenre;

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

    if (mode === "gift") {
        button = (
            <button
                className="btn btn-primary my-2 EditButton"
                onClick={(e) => gift(e)}
            >
                Gift
            </button>
        );

        neededOrGenre = book.Genre;
    } else if (mode === "manage") {
        button = (
            <button
                className="btn btn-primary my-2 EditButton"
                onClick={(e) => edit(e)}
            >
                Edit
            </button>
        );

        neededOrGenre = book.Genre;
    } else {
        button = (
            <a
                href={AMAZON_BASE_URL + book.Title}
                target="_blank"
                className="btn btn-primary my-2 EditButton"
                rel="noopener noreferrer"
            >
                Buy
            </a>
        );

        neededOrGenre = book.Needed;
    }

    if (book.Needed >= 5 && book.Needed < 10) textColor = "#BDB76B";
    else if (book.Needed >= 10 && book.Needed < 20) textColor = "orange";
    else if (book.Needed >= 20) textColor = "red";

    const paddingRight = "1rem";

    return (
        <tr>
            <td style={{ color: textColor }}>{book.Title}</td>
            <td style={{ paddingRight }}>{neededOrGenre}</td>
            <td className="Inventory" style={{ paddingRight }}>
                {book.Inventory}
            </td>
            <td style={{ paddingRight }}>{button}</td>
        </tr>
    );
}
