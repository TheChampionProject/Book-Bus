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
    let error = false,
        errorMessage = "";
    let archiveDates = [],
        archiveDate;
    let archivedBooks = [];

    if (location === "archive") {
        archiveDate = new Date().toISOString();

        archivedBooks = databaseBooks[0].archive;

        let possibleIndex = archivedBooks.findIndex(
            (searchBook) =>
                String(searchBook.Title).toLowerCase() ===
                String(book.Title).toLowerCase()
        );


        if (possibleIndex !== -1) {
            let prevArchivedBook = archivedBooks[possibleIndex];
            if (Object.keys(prevArchivedBook).indexOf("ArchiveDates") !== -1) {
                prevArchivedBook.ArchiveDates = []; // Doesn't already have an array, fb will remove empty arrays to save space
            }
            prevArchivedBook.ArchiveDates.push(archiveDate);
            book = archivedBooks[possibleIndex]; // Now fb will update the prior archive entry
        } else archiveDates.push(archiveDate);


    }

    const editedBook = {
        Title: book.Title,
        Genre: book.Genre,
        Price: book.Price,
    };

    await set(
        ref(db, `/${location}/${book.Index}`),
        location === "archive"
            ? { ...editedBook, ArchiveDates: archiveDates }
            : { ...editedBook, Inventory: book.Inventory, Needed: book.Needed } // Active books have inventory and needed
    ).catch((e) => {
        console.log(e);
        error = true;
        errorMessage = e;
    });

    if (error) return errorMessage;
    else return "success";
};

export { getBooksFB, setBookFB };
