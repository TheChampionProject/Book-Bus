import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookRow from "./BookRow.js";

export default function BookTable({
    setBook,
    setShow,
    managedBook,
    setManagedBook,
    setAlert,
    searchQuery,
    mode,
}) {
    let [books, setBooks] = useState([]);
    let index = useRef();

    // Load books from database on page load
    useEffect(() => {
        const callGetBooks = async () => {
            await getBooks();
        };
        callGetBooks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const asyncManageBook = async () => {
            if (managedBook == null) return;
            if (managedBook.Index !== -1) index.current = managedBook.Index;
            else index.current = books.length; // Adding a book. Give it the next available index

            managedBook.Index = index.current;

            await manageBook({ managedBook: managedBook });
            await getBooks();
        };

        asyncManageBook();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books.length, managedBook]);

    // Get all the books from firebase through an API call to the backend
    const getBooks = async () => {
        let res = [];
        let databaseBooks = [];
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "getAllBooks")
            .catch(() => {
                setAlert({
                    show: true,
                    message:
                        "There was a problem connecting to the database. Please refresh the page",
                    success: false,
                });
            })
            .then((response) => {
                databaseBooks.push(response.data[0]); // response.data[0] is the JSON object full of books

                for (let j in databaseBooks[0].active)
                    res.push(databaseBooks[0].active[j]); // In order to turn a giant JSON full of books into an array of books

                for (let i = 0; i < res.length; i++) {
                    // Neccesary bc firebase isn't reordered. Now after the sort the original index of the book is preserved.
                    res[i] = {
                        Title: res[i].Title,
                        Genre: res[i].Genre,
                        Inventory: res[i].Inventory,
                        Price: res[i].Price,
                        Needed: res[i].Needed,
                        Index: i,
                    };
                }

                res.sort(function (a, b) {
                    return alphaSortArray(a.Title, b.Title);
                });
            });

        setBooks(res);
    };

    // Add or edit book call to backend which calls firebase
    const manageBook = async (newBook) => {
        let message = "";
        if (newBook == null) return;
        let request = await axios
            .put(process.env.REACT_APP_BACKEND_URL + "setBook", {
                newBook,
            })
            .catch(() => {
                setAlert({
                    show: true,
                    message:
                        "There was a problem connecting to the database." +
                        newBook.Title +
                        " was not edited/added",
                    success: false,
                });
            });

        try {
            if (request.data === "success") {
                if (mode === "gift") message = "Gifted ";
                else message = "Edited/Added ";
                setAlert({
                    show: true,
                    message:
                        "Successfully " + message + 
                        newBook.managedBook.Title,
                    success: true,
                });

                setTimeout(() => {
                    setAlert({
                        show: false,
                    });
                }, 3000);
            } else if (request.data === "failure")
                setAlert({
                    show: true,
                    message:
                        "There was a problem connecting to the database." +
                        newBook.Title +
                        " was not edited/added. Please refresh the page.",
                    success: false,
                });
        } catch {
            setAlert({
                show: true,
                message:
                    "There was a problem connecting to the database." +
                    newBook.Title +
                    " was not edited/added. Please refresh the page.",
                success: false,
            });
        }
    };

    const alphaSortArray = (a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
    };

    return books.map((book, number) => {
        number++;
        return (
            <BookRow
                key={number}
                book={book}
                number={number}
                setBook={setBook}
                setShow={setShow}
                setManagedBook={setManagedBook}
                searchQuery={searchQuery}
                mode={mode}
            />
        );
    });
}
