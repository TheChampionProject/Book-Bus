import React, { useEffect } from "react";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import {
    getDatabase,
    ref,
    onValue,
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { firebaseConfig } from "../keys.js";
import BookRow from "./BookRow.js";

export default function BookTable({ setBook, setShow }) {
    let [books, setBooks] = React.useState([]);

    useEffect(() => {
        initializeApp(firebaseConfig);
        const db = getDatabase();
        const dbRef = ref(db, "/");
        let databaseBooks = [];
        onValue(dbRef, async (snapshot) => {
            await snapshot.forEach((childSnapshot) => {
                databaseBooks.push(childSnapshot.val());
                setBooks(databaseBooks);
            });
        });
    }, []);

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
