import QueryRow from "./QueryRow.js";
import React, { useRef } from "react";
import axios from "axios";

import uuidv4 from "uuid";

export default function QueryResults({
    queryList,
    setShowAddPopup,
    setBook,
    setShowEditPopup,
    setAlert,
    setShowTable,
    books,
    searchQuery,

    successfulQuery,
}) {
    let foundBook = useRef(false);

    const add = async (book) => {
        if (foundBook.current) return;
        foundBook.current = true;


        let refinedBook = {};

        for (let i = 0; i < books.length; i++) {
            if (
                books[i].Title.toLowerCase() ===
                book.volumeInfo.title.toLowerCase()
            ) {
                refinedBook = books[i];
            }
        }


        if (book.volumeInfo.maturityRating === "NOT_MATURE") {
            alert(
                "Warning: This book has been flagged with mature content. Please ask for a supervisor's approval before adding it to the library."
            );
            
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

    if (queryList.length === 0) return;
    if (searchQuery === "") return;
    setTimeout(() => {
        if (queryList.length === 1 && successfulQuery.current) {
            add(queryList[0]);
        }
    }, 100);

    return queryList.map((book, number) => {

        try {
            if (
                book.volumeInfo.industryIdentifiers[1].identifier ===
                    searchQuery ||
                (book.volumeInfo.industryIdentifiers[0].identifier ===
                    searchQuery &&
                    !foundBook)
            ) {
                add(book);

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
