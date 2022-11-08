import React, { useEffect, useState } from "react";
import axios from "axios";
import BookRow from "./BookRow.js";

export default function BookTable({ setBook, setShow, managedBook }) {
    let [books, setBooks] = useState([]);
    let index;

    useEffect(() => {
        // Load books from database on page load
        async function callGetBooks() {
            await getBooks();
        }
        callGetBooks();
    }, []);

    useEffect(() => {
        if (managedBook == null) return;
        if (managedBook[1] == null) index = books.length++;
        else index = managedBook[1];

        let newBook = {
            Title: managedBook[0].Title,
            Genre: managedBook[0].Genre,
            Inventory: managedBook[0].Inventory,
            InventoryWanted: managedBook[0].InventoryWanted,
            Price: managedBook[0].Price,
            Index: index,
        };

        manageBook(newBook);
    }, [managedBook]);

    let getBooks = async () => {
        let res = [];
        let databaseBooks = [];
        await axios
            .get(process.env.REACT_APP_BACKEND_URL + "getBooks")
            .then((response) => databaseBooks.push(response.data[0])) // response.data[0] is the JSON object full of books
            .then(() => {
                for (var i in databaseBooks[0]) res.push(databaseBooks[0][i]); // In order to turn a giant JSON full of books into an array of books
            });
        setBooks(res);
    };

    let manageBook = async (newBook) => {
        await axios.post(process.env.REACT_APP_BACKEND_URL + "manageBook", {
            newBook,
        });
    };

    return books.map((book, index) => {
        return (
            <BookRow
                key={index}
                book={book}
                index={index}
                setBook={setBook}
                setShow={setShow}
            />
        );
    });
}
