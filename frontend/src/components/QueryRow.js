import React from "react";
import "../App.css";
import axios from "axios";
import uuidv4 from "uuid";

export default function QueryRow({
    book,
    setShowAddPopup,
    setBook,
    setShowEditPopup,
    setAlert,
    setShowTable,
    books,
}) {
    const add = async (e) => {
        e.preventDefault();

        let refinedBook = {};

        for (let i = 0; i < books.length; i++) {
            if (
                books[i].Title.toLowerCase() ===
                book.volumeInfo.title.toLowerCase()
            ) {
                refinedBook = books[i];
                console.log("Found book: " + refinedBook);
            }
        }

        if (Object.entries(refinedBook).length === 0) {
            refinedBook.AddDates = [];
            refinedBook.Title = book.volumeInfo.title;
            refinedBook.Genre = "N/A";
            refinedBook.Inventory = 1;
            refinedBook.Needed = 0;
            refinedBook.Index = -1;
            refinedBook.UUID = uuidv4();
            refinedBook.Price = "";
        } else {
            refinedBook.Inventory = parseInt(refinedBook.Inventory) + 1;
        }

        if (!refinedBook.AddDates) {
            refinedBook.AddDates = [];
        }

        if (!refinedBook.Price) refinedBook.Price = "";

        refinedBook.AddDates.push(new Date().toISOString());

        setShowAddPopup(false);
        setBook(refinedBook);
        setShowEditPopup(true);
    };

    if (!book || !book.volumeInfo.title) {
        setShowTable(false);
        setAlert({
            show: true,
            message:
                "There was a problem with your search query. Please refresh and try again.",
            success: false,
        });

        return null;
    }

    if (!book.volumeInfo.authors) book.volumeInfo.authors = ["N/A"];

    return (
        <tr>
            <td>{book.volumeInfo.title}</td>
            <td>{book.volumeInfo.authors.join(", ")}</td>
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
