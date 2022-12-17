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
    const add = async (book) => {
        const refinedBook = {}; // In order to get the Google Books autocomplete to work with our book-object format.

        if (
            books.filter(
                ({ Title }) =>
                    Title.toLowerCase() === book.volumeInfo.title.toLowerCase()
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

        setBook(refinedBook);
        setShowEditPopup(true);
        return;
    };

    if (queryList.length === 0) return;
    return queryList.map((book, number) => {

        try {
            if (
                book.volumeInfo.industryIdentifiers[1].identifier ===
                searchQuery
            ) {
                add(book);
                return;
            }
        } catch {
        }

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
