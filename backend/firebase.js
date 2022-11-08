import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child } from "firebase/database";
import dotenv from "dotenv";
import { firebaseConfig } from "../keys.js";

dotenv.config();

initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());
let databaseBooks = [];

const getBooksFB = async () => {
    databaseBooks = [];

    await get(child(dbRef, `/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                databaseBooks.push(snapshot.val());
            } else {
                return "No Data Found";
            }
        })
        .catch((error) => {
            return error;
        });

    databaseBooks.sort(function (a, b) {
        return alphaSortArray(a.Title, b.Title);
    });

    return databaseBooks;
};

const setBookFB = async (book) => {
    await set(ref(db, "/" + book.Index), {
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
