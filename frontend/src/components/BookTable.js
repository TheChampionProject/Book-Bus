import React, { useEffect, useState } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
    set,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { firebaseConfig } from "../keys.js";
import BookRow from "./BookRow.js";

export default function BookTable({ setBook, setShow, managedBook }) {
    initializeApp(firebaseConfig);
    const db = getDatabase();
    const dbRef = ref(db, "/");

    let [books, setBooks] = useState([]);
    let updateBooks = 0;

    let index;

    useEffect(() => {
        let databaseBooks = [];
        onValue(dbRef, async (snapshot) => {
            await snapshot.forEach((childSnapshot) => {
                databaseBooks.push(childSnapshot.val());
                setBooks(databaseBooks);
            });
        });
    }, [updateBooks]);

    useEffect(() => {
        if (managedBook == null) return;
        if (managedBook[1] == null) index = books.length++;
        else index = managedBook[1];

        set(ref(db, "/" + index), {
            Title: managedBook[0].Title,
            Genre: managedBook[0].Genre,
            Inventory: managedBook[0].Inventory,
            InventoryWanted: managedBook[0].InventoryWanted,
            Price: managedBook[0].Price,
        })
            .then(() => {
                updateBooks++;
            }) // I have to do this to force a re-render. Will clean up later
            .catch((e) => {
                alert("Book failed to edit");
            });
    }, [managedBook]);

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
