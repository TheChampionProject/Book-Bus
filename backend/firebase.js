import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child } from "firebase/database";
import dotenv from "dotenv";
import { firebaseConfig } from "../keys.js";
import asyncHandler from "express-async-handler";

dotenv.config();

initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());
let databaseBooks = [];

const getBooksFB = async () => {
    databaseBooks = [];
    console.log("Getting");
    // await get(
    //     child(dbRef,"/" async (snapshot) => {
    //         console.log("Calling");
    //         await snapshot.forEach((childSnapshot) => {
    //             databaseBooks.push(childSnapshot.val());
    //         });

    //         databaseBooks.sort(function (a, b) {
    //             return alphaSortArray(a.Title, b.Title);
    //         });
    //     })
    // );
    // console.log("Returning");
    // return databaseBooks;
    await get(child(dbRef, `/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                databaseBooks.push(snapshot.val())
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });

    return databaseBooks;
};

console.log(await getBooksFB());

const setBookFB = async (book, index) => {
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
