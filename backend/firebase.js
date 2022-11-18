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
    let error = false;
    let errorMessage = "";

    await get(child(dbRef, `/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                databaseBooks.push(snapshot.val());
            } else {
                error = true;
                errorMessage = "No Data Found";
            }
        })
        .catch((error) => {
            error = true;
            errorMessage = error;
        });

    if (error) return errorMessage;
    else return databaseBooks;
};

const setBookFB = async (book, location) => {
    book = book.managedBook;
    let error = false;
    let errorMessage = "";

    await set(ref(db, "/" + location + "/" + book.Index), {
        Title: book.Title,
        Genre: book.Genre,
        Inventory: book.Inventory,
        Price: book.Price,
        Needed: book.Needed,
    }).catch((e) => {
        error = true;
        errorMessage = e;
    });

    if (error) return errorMessage;
    else return "success";
};

export { getBooksFB, setBookFB };
