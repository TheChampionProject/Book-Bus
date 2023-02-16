import React, { useEffect, useRef } from "react";
import BookRow from "./BookRow.js";
import { getBooksFB, setBookFB } from "../FirebaseFunctions";
export default function BookTable({
    setBook,
    setShowEditPopup,
    managedBook,
    setManagedBook,
    setAlert,
    searchQuery,
    mode,
    setShowGC,
    books,
    setBooks,
    genreFilter,
}) {
    let index = useRef();

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
    }, [managedBook]);

    const getBooks = async () => {
        let res = [];
        let databaseBooks = [];
        const books = await getBooksFB();
        databaseBooks.push(books[0]); // response.data[0] is the JSON object full of books

        for (let j in databaseBooks[0].active) {
            res.push({ ...databaseBooks[0].active[j], UUID: j }); // In order to turn a giant JSON full of books into an array of books
        }

        res = res.filter((n) => n); // Remove null entries which is what deleted books are

        for (let i = 0; i < res.length; i++) {
            // Neccesary bc firebase isn't reordered. Now after the sort the original index of the book is preserved.
            res[i] = {
                Title: res[i].Title,
                Genre: res[i].Genre,
                Inventory: res[i].Inventory,
                Price: res[i].Price,
                Needed: res[i].Needed,
                UUID: res[i].UUID,
                AddDates: res[i].AddDates ? res[i].AddDates : [],
            };
        }

        if (mode === "gift" || mode === "manage") {
            res.sort((a, b) => {
                return alphaSortArray(a.Title, b.Title);
            });
        } else {
            res.sort((a, b) => {
                return neededSortArray(a.Needed, b.Needed);
            });
        }

        setBooks(res);
    };

    // Add or edit book call to backend which calls firebase
    const manageBook = async (newBook) => {
        let message = "";

        if (mode === "gift") {
            message = "gifted ";
            newBook.gift = true;
        } else {
            message = "updated the database with ";
            newBook.gift = false;
        }

        if (newBook == null) return;
        let request = await setBookFB(newBook, newBook.gift ? "archive" : "active").catch(() => {
            setAlert({
                show: true,
                message:
                    "There was a problem connecting to the database." +
                    newBook.Title +
                    " was not " +
                    message,
                success: false,
            });
        });

        try {
            if (request.data === "success") {
                setAlert({
                    show: true,
                    message:
                        "Successfully " +
                        message +
                        `"${newBook.managedBook.Title}"`,
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
                        " was not " +
                        message +
                        ". Please refresh the page.",
                    success: false,
                });
        } catch {
            setAlert({
                show: true,
                message:
                    "There was a problem connecting to the database." +
                    newBook.Title +
                    " was not " +
                    message +
                    ". Please refresh the page.",
                success: false,
            });
        }
    };

    const alphaSortArray = (a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();

        return a < b ? -1 : a > b ? 1 : 0;
    };

    const neededSortArray = (a, b) => {
        return a < b ? 1 : a > b ? -1 : 0;
    };

    return books === null ? (
        <tr>
            <td>Loading...</td>
        </tr>
    ) : (
        books
            .filter((book) => (mode === "manage" ? true : book.Inventory > 0))
            .filter((book) =>
                genreFilter === "All" ? true : book.Genre === genreFilter
            )
            .filter((book) =>
                searchQuery === ""
                    ? true
                    : book.Title.toLowerCase().includes(
                          searchQuery.toLowerCase()
                      )
            )
            .map((book, number) => (
                <BookRow
                    key={number}
                    book={book}
                    setBook={setBook}
                    setShowEditPopup={setShowEditPopup}
                    setManagedBook={setManagedBook}
                    searchQuery={searchQuery}
                    mode={mode}
                    setShowGC={setShowGC}
                />
            ))
    );
}
