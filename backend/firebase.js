import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set } from "firebase/database";
import dotenv from "dotenv";
import { firebaseConfig } from "../keys.js";
import asyncHandler from "express-async-handler";

dotenv.config();

initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db, "/");
let databaseBooks = [];

const getBooksFB = async () => {
    await get(dbRef, async (snapshot) => {
        databaseBooks = [];

        console.log("Calling");
        await snapshot.forEach((childSnapshot) => {
            databaseBooks.push(childSnapshot.val());
        });

        databaseBooks.sort(function (a, b) {
            return alphaSortArray(a.Title, b.Title);
        });
    })
    console.log("Returning");
    return databaseBooks;
};

const setBookFB = (book, index) => {
    set(ref(db, "/" + index), {
        Title: book.Title,
        Genre: book.Genre,
        Inventory: book.Inventory,
        InventoryWanted: book.InventoryWanted,
        Price: book.Price,
    }).catch((e) => {
        return e;
    });
};

let alphaSortArray = (a, b) => {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a < b ? -1 : a > b ? 1 : 0;
};

export { getBooksFB, setBookFB };
