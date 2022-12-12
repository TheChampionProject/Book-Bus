import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child } from "firebase/database";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    getDoc,
} from "firebase/firestore";
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
    await setDoc(doc(firestoredb, "users", auth.currentUser.uid), {
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
    await signInWithEmailAndPassword(auth, email, password).catch((e) => {
        return e;
    });
    const docRef = doc(firestoredb, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const verification = docSnap.data();
    return verification;
};

const resetPasswordAuth = async (email) => {
    await sendPasswordResetEmail(auth, email).catch((e) => {
        return e;
    });
};

const bookBusVerify = async (verificationFile) => {
    const docRef = doc(firestoredb, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const usrName = docSnap.data().name;

    const targetRef = storageRef(
        storage,
        `verificationForms/${usrName.split(" ")[0]}_${
            usrName.split(" ")[1]
        }_verificationForm.pdf`
    );
    await uploadBytes(targetRef, verificationFile.buffer).then(async () => {
        await updateDoc(docRef, {
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
        data = "";

    for (let i in dates[0]) {
        if (dates[0][i].id === dateID) {
            data = dates[0][i];
        }
    }

    if (data === "") {
        console.log("No date found with that ID.");
        return "No date found with that ID.";
    }

    
    if (auth.currentUser.uid !== null) // Doesn't work :(
        data.volunteers.push(auth.currentUser.uid);

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
