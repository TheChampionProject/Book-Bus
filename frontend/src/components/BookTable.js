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

    const [books, setBooks] = useState([]);
    let index, databaseBooks;

    let arraysEqual = (a, b) => {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        return true;
    };

    onValue(dbRef, async (snapshot) => {
        databaseBooks = [];
        await snapshot.forEach((childSnapshot) => {
            databaseBooks.push(childSnapshot.val());
        });
        if (!arraysEqual(databaseBooks, books)) setBooks(databaseBooks);
    });

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
        }).catch((e) => {
            alert("Book failed to edit");
            console.log(e);
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
