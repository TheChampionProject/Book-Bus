import QueryRow from "./QueryRow.js";
import React from "react";
import axios from "axios";
export default function QueryResults({
    queryList,
    setShowAddPopup,
    setBook,
    setShowEditPopup,
    setAlert,
    setShowTable,
    books,
    searchQuery,
}) {
    let foundBook = false;
    const add = async (book) => {
        let refinedBook = {};

        for (let i = 0; i < books.length; i++) {
            if (
                books[i].Title.toLowerCase() ===
                book.volumeInfo.title.toLowerCase()
            ) {
                console.log("This book is already in the database.");
                refinedBook = books[i];
            }
        }

        if (Object.entries(refinedBook).length === 0) {
            refinedBook.AddDates = [];
            refinedBook.Title = book.volumeInfo.title;
            refinedBook.Genre = "N/A";
            refinedBook.Inventory = 1;
            refinedBook.Needed = 0;
            refinedBook.Index = -1;
        }

        if (refinedBook.AddDates === undefined) refinedBook.AddDates = [];

        refinedBook.AddDates.push(new Date().toISOString());

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
        } else
            refinedBook.Price = book.saleInfo.listPrice.amount
                ? book.saleInfo.listPrice.amount
                : "5";

        setShowAddPopup(false);
        setBook(refinedBook);
        setShowEditPopup(true);
    };

    if (queryList.length === 0) return;
    return queryList.map((book, number) => {
        try {
            if (
                book.volumeInfo.industryIdentifiers[1].identifier ===
                searchQuery || book.volumeInfo.industryIdentifiers[0].identifier === searchQuery
            ) {
                if (!foundBook) {
                    add(book);
                    foundBook = true;
                }
            }
        } catch {}

        return (
            <QueryRow
                key={number}
                book={book}
                setShowAddPopup={setShowAddPopup}
                setBook={setBook}
                setShowEditPopup={setShowEditPopup}
                setAlert={setAlert}
                setShowTable={setShowTable}
                books={books}
            />
        );
    });
}
