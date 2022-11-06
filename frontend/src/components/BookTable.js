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

        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.

        // for (var i = 0; i < a.length; ++i) {
        //     if (a[i] !== b[i]) return false;
        // }
        return true;
    };

    onValue(dbRef, async (snapshot) => {
        databaseBooks = [];
        await snapshot.forEach((childSnapshot) => {
            databaseBooks.push(childSnapshot.val());
        });
        if (arraysEqual(databaseBooks, books)) {
            console.log("No change");
        } else {
            console.log("Change detected");
            setBooks(databaseBooks);
        }
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
        })
            // I have to do this to force a re-render. Will clean up later
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
