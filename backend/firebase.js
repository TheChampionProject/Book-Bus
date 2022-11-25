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
    await getBooksFB();
    let error = false,
        errorMessage = "";
    let archiveDates = [],
        archiveDate;
    let prevArchivedBooks = [];
    let sendAddDates = "";

    if (location === "archive") {
        archiveDate = new Date().toISOString();

        prevArchivedBooks = Object.values(databaseBooks[0].archive); // Get all archived books with JSONs in array

        let possibleIndex = prevArchivedBooks.findIndex(
            (searchBook) =>
                String(searchBook.Title).toLowerCase() ===
                String(book.Title).toLowerCase()
        );

        if (possibleIndex !== -1) {
            let prevArchivedBook = prevArchivedBooks[possibleIndex];

            for (let i = 0; i < prevArchivedBook.ArchiveDates.length; i++) {
                archiveDates.push(prevArchivedBook.ArchiveDates[i]);
            }

            archiveDates.push(archiveDate);

            book = prevArchivedBooks[possibleIndex]; // Now fb will update the prior archive entry
            book.Index = possibleIndex;
        } else {
            // The first time the book is being archived. No other archive dates and reset its index
            archiveDates.push(archiveDate);
            book.Index = prevArchivedBooks.length;
        }
    }

    const editedBook = {
        Title: book.Title,
        Genre: book.Genre,
        Price: book.Price,
    };

    if (book.AddDates) sendAddDates = book.AddDates;

    await set(
        ref(db, `/${location}/${book.Index}`),
        location === "archive"
            ? { ...editedBook, ArchiveDates: archiveDates }
            : {
                  ...editedBook,
                  Inventory: book.Inventory,
                  Needed: book.Needed,
                  AddDates: sendAddDates,
              } // Active books have inventory and needed
    ).catch((e) => {
        console.log(e);
        error = true;
        errorMessage = e;
    });

    if (error) return errorMessage;
    else return "success";
};

export { getBooksFB, setBookFB };
