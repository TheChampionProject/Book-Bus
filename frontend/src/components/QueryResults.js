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
    okayToRun,
}) {
    let foundBook = useRef(false);

    const add = async (book) => {
        if (foundBook.current || !okayToRun.current) return;
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
            let queriedPrice = await axios.post(
                // Ask another API for the price
                process.env.REACT_APP_BACKEND_URL + "getBookPrice",
                { title: refinedBook.Title }
            );

            if (queriedPrice.data !== "error")
                refinedBook.Price = queriedPrice.data;
        } catch {
            refinedBook.Price = "5";
        }

        setBook(refinedBook);
        setShowAddPopup(false);
        setShowEditPopup(true);
        okayToRun.current = false;
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
