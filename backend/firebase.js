import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import dotenv from "dotenv";
import { firebaseConfig } from "../keys.js";
dotenv.config();

initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db, "/");
let databaseBooks = [];

let getBooksFB = () => {
    onValue(dbRef, async (snapshot) => {
        databaseBooks = [];

        snapshot.forEach((childSnapshot) => {
            databaseBooks.push(childSnapshot.val());
        });

        databaseBooks.sort(function (a, b) {
            return alphaSortArray(a.Title, b.Title);
        });

        return databaseBooks;
    });
};

let setBookFB = (book, index) => {
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
