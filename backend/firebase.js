import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child } from "firebase/database";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, uploadBytes, ref as storageRef } from "firebase/storage";
import dotenv from "dotenv";
import { firebaseConfig } from "../keys.js";

dotenv.config();

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(getDatabase());
const auth = getAuth(app);
const firestoredb = getFirestore(app);
const storage = getStorage();
let databaseBooks = [];

const getBooksFB = async () => {
    databaseBooks = [];
    let errorMessage = "";

    await get(child(dbRef, `/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                databaseBooks.push(snapshot.val());
            } else {
                errorMessage = "No Data Found";
            }
        })
        .catch((error) => {
            errorMessage = error;
        });

    if (errorMessage !== "") return errorMessage;
    else return databaseBooks;
};

const setBookFB = async (book, location) => {
    await getBooksFB();
    let errorMessage = "";
    let archiveDates = [],
        archiveDate;
    let prevArchivedBooks = [];
    let sendAddDates = "";
    let params;

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

    if (location === "archive") {
        params = { ...editedBook, ArchiveDates: archiveDates };
    } else {
        if (book.Inventory === 0) {
            params = null;
        } else
            params = {
                ...editedBook,
                Inventory: book.Inventory,
                Needed: book.Needed,
                AddDates: sendAddDates,
            };
    }

    await set(ref(db, `/${location}/${book.UUID}`), params).catch((e) => {
        errorMessage = e;
    });

    if (errorMessage !== "") return errorMessage;
    else return "success";
};

const signUpAuth = async (email, password, first, last) => {
    const currentUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    ).catch((e) => {
        return e;
    });
    await setDoc(doc(firestoredb, "users", auth.currentUser.user.uid), {
        email: email,
        name: first + " " + last,
        password: password,
        watchedVideo: false,
        uploadedForm: false,
    }).catch((e) => {
        return e;
    });
    return currentUser;
};

const signInAuth = async (email, password) => {
    const currentUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
    ).catch((e) => {
        return e;
    });
    return currentUser;
};

const resetPasswordAuth = async (email) => {
    await sendPasswordResetEmail(auth, email).catch((e) => {
        return e;
    });
};

const bookBusVerify = async (verificationFile) => {
    const auth = getAuth();

    const targetRef = storageRef(
        storage,
        `verificationForms/${auth.currentUser.displayName}`
    );
    await uploadBytes(targetRef, verificationFile.buffer).then(async () => {
        await updateDoc(doc(firestoredb, "users", auth.currentUser.uid), {
            watchedVideo: true,
            uploadedForm: true,
        });
    });
};

const getVolunteerDatesFB = async () => {
    let dates = [];
    let errorMessage = "";
    await get(child(dbRef, `/volunteer-dates`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                dates.push(snapshot.val());
            } else {
                errorMessage = "No Data Found";
            }
        })
        .catch((error) => {
            errorMessage = error;
        });

    if (errorMessage !== "") return errorMessage;
    else return dates;
};

const updateVolunteerDateFB = async (dateID) => {
    let dates = await getVolunteerDatesFB();
    let errorMessage = "",
        data;

    for (let i in dates[0]) {
        if (dates[0][i].id === dateID) {
            data = dates[0][i];
        }
    }
    const auth = getAuth();

    if (data.volunteers.includes(auth.currentUser.displayName))
        return "You are already signed up for this date.";

    data.volunteers.push(auth.currentUser.displayName);

    await set(ref(db, `/volunteer-dates/${dateID}/`), { ...data }).catch(
        (e) => {
            errorMessage = e;
        }
    );

    if (errorMessage !== "") return errorMessage;
    else return "success";
};

export const getSignedInUserFB = async () => {
    return getAuth();
};

export {
    getBooksFB,
    setBookFB,
    signUpAuth,
    signInAuth,
    resetPasswordAuth,
    bookBusVerify,
    getVolunteerDatesFB,
    updateVolunteerDateFB,
};
