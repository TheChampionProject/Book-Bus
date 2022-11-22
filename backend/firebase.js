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
    let archiveDates = ["null"],
        foundPriorArchive = false,
        archiveDate;
    let archiveBooks = [],
        rawBooks = [];

    if (location === "archive") {
        book.Inventory = -1;
        archiveDate = new Date().toISOString();

        rawBooks.push(databaseBooks[0]);
        for (let j in rawBooks[0].archive)
            archiveBooks.push(databaseBooks[0].active[j]); // In order to turn a giant JSON full of books into an array of books

        for (let i = 0; i < archiveBooks.length; i++) {
            if (
                String(archiveBooks[i].Title).toLowerCase() ===
                String(book.Title).toLowerCase()
            ) {
                archiveBooks[i].numberArchived++;
                if (archiveBooks[i].archiveDates === "null")
                    archiveBooks[i].archiveDates = []; // Doesn't already have an array, fb will remove empty arrays to save space
                archiveBooks[i].archiveDates.push(archiveDate);
                book = archiveBooks[i]; // Now fb will update the prior archive entry
                foundPriorArchive = true;
            }

            if (!foundPriorArchive) archiveDates.push(archiveDate);
        }
    } else {
        rawBooks.push(databaseBooks[0]);
        for (let j in rawBooks[0].active)
            archiveBooks.push(databaseBooks[0].active[j]); // In order to turn a giant JSON full of books into an array of books

        for (let i = 0; i < archiveBooks.length; i++) {
            if (
                String(archiveBooks[i].Title).toLowerCase() ===
                String(book.Title).toLowerCase()
            )
                console.log("Found one, adding to inventory");
        }
    }

    let editedBook = {
        Title: book.Title,
        Genre: book.Genre,
        Price: book.Price,
        ArchiveDates: archiveDates,
    };

    await set(ref(db, `/${location}/${book.Index}`), location==="archive" ? editedBook :{...editedBook, Inventory: book.Inventory, Needed: book.Needed}).catch((e) => {
        console.log(e);
        error = true;
        errorMessage = e;
    });

    if (error) return errorMessage;
    else return "success";
};

export { getBooksFB, setBookFB };
