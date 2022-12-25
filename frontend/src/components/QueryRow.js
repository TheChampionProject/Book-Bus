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

        if (book.volumeInfo.maturityRating === "NOT_MATURE") {
            alert(
                "Warning: This book has been flagged with mature content. Please ask for a supervisor's approval before adding it to the library."
            );
            console.log(book.volumeInfo.title);
        }


        if (Object.entries(refinedBook).length === 0) {
            refinedBook.AddDates = [];
            refinedBook.Title = book.volumeInfo.title;
            refinedBook.Genre = "N/A";
            refinedBook.Inventory = 1;
            refinedBook.Needed = 0;
            refinedBook.Index = -1;
            refinedBook.UUID = uuidv4();
        } else {
            refinedBook.Inventory = parseInt(refinedBook.Inventory) + 1;
        }

        if (!refinedBook.AddDates) {
            refinedBook.AddDates = [];
        }

        refinedBook.AddDates.push(new Date().toISOString());

        try {
            if (book.saleInfo.saleability === "NOT_FOR_SALE") {
                // Google Books doesn't have a price for this book
                let ISBN = book.volumeInfo.industryIdentifiers[0].identifier;
                let booksRunPrice = await axios.post(
                    // Ask another API for the price
                    process.env.REACT_APP_BACKEND_URL + "getBookPrice",
                    { ISBN }
                );

                if (typeof booksRunPrice.data.price === "number") {
                    // If they have the price
                    refinedBook.Price = booksRunPrice.data.price;

                } else refinedBook.Price = "5"; // No one has the price :(
            } else {
                refinedBook.Price = book.saleInfo.listPrice.amount
                    ? book.saleInfo.listPrice.amount
                    : "5";
            }
        } catch {
            refinedBook.Price = "5";
        }


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
