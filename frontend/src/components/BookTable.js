import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import BookRow from "./BookRow.js";

export default function BookTable({ setBook, setShow, managedBook }) {
    let [books, setBooks] = useState([]);
    let index = useRef();

    useEffect(() => {
        // Load books from database on page load
        async function callGetBooks() {
            await getBooks();
        }
        callGetBooks();
    }, []);

    useEffect(() => {
        if (managedBook == null) return;
        if (managedBook.Index !== -1)
            if (index.current === managedBook.Index)
                // Editing a book
                return; // The book has already been edited
            else index.current = managedBook.Index;
        else index.current = books.length; // Adding a book

        let newBook = {
            Title: managedBook.Title,
            Genre: managedBook.Genre,
            Inventory: managedBook.Inventory,
            Price: managedBook.Price,
            Index: index.current,
        };

        manageBook(newBook);
    }, [books.length, managedBook]);

    let getBooks = async () => {
        let res = [];
        let databaseBooks = [];
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "getBooks")
            .catch(() => {})
            .then((response) => databaseBooks.push(response.data[0])) // response.data[0] is the JSON object full of books
            .then(() => {
                for (var i in databaseBooks[0]) res.push(databaseBooks[0][i]); // In order to turn a giant JSON full of books into an array of books
            })
            .then(() => {
                for (var i = 0; i < res.length; i++) { // After the sort, the original index of the book is preserved. Neccesary bc firebase isn't reordered
                    res[i] = {
                        Title: res[i].Title,
                        Genre: res[i].Genre,
                        Inventory: res[i].Inventory,
                        Price: res[i].Price,
                        Index: i,
                    };
                }

                res.sort(function (a, b) {
                    return alphaSortArray(a.Title, b.Title);
                });
            });

        setBooks(res);
    };

    let manageBook = async (newBook) => {
        if (newBook == null) return;
        await axios
            .post(process.env.REACT_APP_BACKEND_URL + "manageBook", {
                newBook,
            })
            .catch(() => {});
    };

    let alphaSortArray = (a, b) => {
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
            />
        );
    });
}
