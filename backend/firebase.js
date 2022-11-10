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
    console.log("Getting Books...");
    databaseBooks = [];
    let error = false;
    let errorMessage = "";

    await get(child(dbRef, `/`));
    console.log("Test get succeeded");

    await get(child(dbRef, `/`))
        .then((snapshot) => {
            console.log("Adding Books...");
            if (snapshot.exists()) {
                console.log("Pushing Books...");
                databaseBooks.push(snapshot.val());
            } else {
                error = true;
                errorMessage = "No Data Found";
                console.log(errorMessage);
            }
        })
        .catch((error) => {
            error = true;
            errorMessage = error;
            console.log(errorMessage);
        });

    if (error) {
        console.log("Error getting books!");
        return errorMessage;
    } else {
        console.log("Books added!");
        return databaseBooks;
    }
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

export { getBooksFB, setBookFB };
