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

await getBooksFB();
let book = {
    Title: "1, 2, 3… By the sea",
    Genre: "Fantasy",
    Inventory: 1,
    Price: 10,
};

let archiveBooks = [],
    rawBooks = [];
rawBooks.push(databaseBooks[0]);
for (let j in rawBooks[0].archive) archiveBooks.push(databaseBooks[0].active[j]); // In order to turn a giant JSON full of books into an array of books

for (let i = 0; i < archiveBooks.length; i++) {
    if (
        String(archiveBooks[i].Title).toLowerCase() ===
        String(book.Title).toLowerCase()
    )
        console.log("Found");
}

const setBookFB = async (book, location) => {
    let error = false;
    let errorMessage = "";
    let archiveDate = "";
    let numberArchived = -1;

    if (location === "archive") {
        archiveDate = new Date().toISOString();

        numberArchived = 1;
        book.Inventory = -1;
    }

    await set(ref(db, `/${location}/${book.Index}`), {
        Title: book.Title,
        Genre: book.Genre,
        Inventory: book.Inventory,
        Price: book.Price,
        Needed: book.Needed,
        ArchiveDate: archiveDate,
        NumberArchived: numberArchived,
    }).catch((e) => {
        console.log(e);
        error = true;
        errorMessage = e;
    });

    if (error) return errorMessage;
    else return "success";
};

export { getBooksFB, setBookFB };
