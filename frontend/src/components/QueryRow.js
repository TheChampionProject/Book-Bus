import React from "react";
import "../App.css";
import axios from "axios";
export default function QueryRow({
    book,
    setShowAddPopup,
    setBook,
    setShowEditPopup,
    setAlert,
    setShowTable,
    books,
}) {
    const refinedBook = {}; // In order to get the Google Books autocomplete to work with our book-object format.

    const add = async (e) => {
        e.preventDefault();

            if (
                books.filter(
                    ({ Title }) =>
                        Title.toLowerCase() ===
                        book.volumeInfo.title.toLowerCase()
                ).length > 0
            ) {
                alert(
                    "This book is already in the database. Please find it and change its inventory instead."
                );
                return;
            }
        

        refinedBook.AddDates = []; // Date for when book is added. Some books already with this name so can't pick a better one :(
        refinedBook.AddDates.push(new Date().toISOString());

        setShowAddPopup(false);

        refinedBook.Title = book.volumeInfo.title;
        refinedBook.Genre = "N/A";
        refinedBook.Inventory = 1;
        refinedBook.Needed = 0;
        refinedBook.Index = -1; // So that when book table sees it it knows its a new book and will give it the next available index.

        if (book.saleInfo.saleability === "NOT_FOR_SALE") {
            // Google Books doesn't have a price for this book
            let ISBN = book.volumeInfo.industryIdentifiers[0].identifier;
            try {
                let booksRunPrice = await axios.post(
                    // Ask another API for the price
                    process.env.REACT_APP_BACKEND_URL + "getBookPrice",
                    { ISBN }
                );

                if (typeof booksRunPrice.data.price === "number") {
                    // If they have the price
                    refinedBook.Price = booksRunPrice.data.price;
                } else refinedBook.Price = "N/A"; // No one has the price :(
            } catch {
                refinedBook.Price = "5"; // No one has the price :(
            }
        } else
            refinedBook.Price = book.saleInfo.listPrice.amount
                ? book.saleInfo.listPrice.amount
                : "5";

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
