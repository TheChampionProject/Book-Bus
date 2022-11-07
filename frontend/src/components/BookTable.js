import React, { useEffect, useState } from "react";
import axios from "axios";
import BookRow from "./BookRow.js";

export default function BookTable({ setBook, setShow, managedBook }) {
    let [books, setBooks] = useState([]);
    let index;

    useEffect(() => {
        let getBooks = async () => {
            let databaseBooks = [];
            await axios
                .get(process.env.REACT_APP_BACKEND_URL + "getBooks")
                .then((response) => databaseBooks.push(response.data[0]))
                .then(() => {
                    setBooks(databaseBooks[0]);
                });
        };
        getBooks();
    }, []);

    // useEffect(() => {
    //     if (managedBook == null) return;
    //     if (managedBook[1] == null) index = books.length++;
    //     else index = managedBook[1];

    //     await axios.put(process.env.BACKEND_URL + "/manageBook")

    //     set(ref(db, "/" + index), {
    //         Title: managedBook[0].Title,
    //         Genre: managedBook[0].Genre,
    //         Inventory: managedBook[0].Inventory,
    //         InventoryWanted: managedBook[0].InventoryWanted,
    //         Price: managedBook[0].Price,
    //     }).catch((e) => {
    //         alert("Book failed to edit");
    //         console.log(e);
    //     });
    // }, [managedBook]);

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
