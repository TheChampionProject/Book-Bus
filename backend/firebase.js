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
    let archiveDates = ["00/00/0000"],
        foundPriorArchive = false,
        archiveDate;
    let archivedBooks = [],
        rawBooks = [];

    if (location === "archive") {
        archiveDate = new Date().toISOString();

        for (let j in databaseBooks[0].archive)
            archivedBooks.push(databaseBooks[0].archive[j]); // In order to turn a giant JSON full of books into an array of books

        for (let i = 0; i < archivedBooks.length; i++) {
            if (
                String(archivedBooks[i].Title).toLowerCase() ===
                    String(book.Title).toLowerCase() &&
                !foundPriorArchive
            ) {
                archivedBooks[i].numberArchived++;
                if (archivedBooks[i].archiveDates !== undefined)
                    archivedBooks[i].archiveDates = []; // Doesn't already have an array, fb will remove empty arrays to save space
                archivedBooks[i].archiveDates.push(archiveDate);
                book = archivedBooks[i]; // Now fb will update the prior archive entry
                foundPriorArchive = true;
                console.log("Found Prior Archive")
            }

            if (!foundPriorArchive) archiveDates.push(archiveDate);
        }
    } else {
        rawBooks.push(databaseBooks[0]);
        for (let j in rawBooks[0].active)
            archivedBooks.push(databaseBooks[0].active[j]); // In order to turn a giant JSON full of books into an array of books

        for (let i = 0; i < archivedBooks.length; i++) {
            if (
                String(archivedBooks[i].Title).toLowerCase() ===
                String(book.Title).toLowerCase()
            )
                console.log("Found one, adding to inventory");
        }
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
