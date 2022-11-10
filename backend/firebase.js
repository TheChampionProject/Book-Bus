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
    let errorMesage = "";

    await get(child(dbRef, `/`))
        .then((snapshot) => {
            console.log("Adding books...");
            if (snapshot.exists()) {
                databaseBooks.push(snapshot.val());
            } else {
                error = true;
                errorMesage = "No Data Found";
            }
        })
        .catch((error) => {
            error = true;
            errorMesage = error;
        });

    if (error) return errorMesage;
    else {
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
