import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child } from "firebase/database";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    getDocs,
} from "firebase/firestore";
import { getStorage, uploadBytes, ref as storageRef } from "firebase/storage";
import dotenv from "dotenv";
import { firebaseConfig } from "./keys.js";
import axios from "axios";

dotenv.config();

const GOOGLE_BOOKS_API_BASE_URL =
    "https://www.googleapis.com/books/v1/volumes?q=";

export const app = initializeApp(firebaseConfig);
export const db = getDatabase();
export const auth = getAuth(app);

const firestoredb = getFirestore(app);
const storage = getStorage();
let databaseBooks = [];
const dbRef = ref(getDatabase());

export const getBooksFB = async () => {
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

export const setBookFB = async (book, gift) => {
    await getBooksFB();

    let errorMessage = "";
    let archiveDates = [],
        archiveDate;
    let prevArchivedBooks = [];
    let sendAddDates = "";
    let params;

    if (gift) {
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

    if (gift) {
        params = { ...editedBook, ArchiveDates: archiveDates };
    } else {
        params = {
            ...editedBook,
            Inventory: book.Inventory,
            Needed: book.Needed,
            AddDates: book.AddDates,
        };
    }

    await set(
        ref(db, `/${gift ? "archive" : "active"}/${book.UUID}`),
        params
    ).catch((e) => {
        errorMessage = e;
        console.log(e);
    });

    if (errorMessage !== "") return errorMessage;
    else return "success";
};

export const signUpAuth = async (email, password, first, last) => {
    const currentUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
    ).catch((e) => {
        return e;
    });

    await signInWithEmailAndPassword(auth, email, password).catch((e) => {
        return e;
    });
    await setDoc(doc(firestoredb, "users", auth.currentUser.uid), {
        email: email,
        name: first + " " + last,
        password: password,
        verified: false,
        uid: auth.currentUser.uid,
    }).catch((e) => {
        return e;
    });
    return currentUser;
};

export const updateUserVerificationFB = async (user, verified) => {
    await setDoc(doc(firestoredb, "users", user.uid), {
        email: user.email,
        name: user.name,
        password: user.password,
        verified: verified,
        uid: user.uid,
    }).catch((e) => {
        return e;
    });
};

export const signInAuth = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).catch((e) => {
        return e;
    });

    const docRef = doc(firestoredb, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const verification = docSnap.data();
    return verification;
};

export const resetPasswordAuth = async (email) => {
    await sendPasswordResetEmail(auth, email).catch((e) => {
        return e;
    });
};

export const verify = async (verificationFile, userName) => {
    const targetRef = storageRef(
        storage,
        `verificationForms/${userName.split(" ")[0]}_${
            userName.split(" ")[1]
        }_verificationForm.pdf`
    );

    await uploadBytes(targetRef, verificationFile.buffer);
};

export const getVolunteerDatesFB = async () => {
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

export const updateVolunteerDateFB = async (dateID, userName, add) => {
    let dates = await getVolunteerDatesFB();

    let errorMessage = "",
        data = "";

    for (let i in dates[0]) {
        if (dates[0][i].id === dateID) {
            data = dates[0][i];
        }
    }

    if (data === "") {
        return "No date found with that ID.";
    }

    if (userName === "No user signed in") {
        return userName;
    }

    if (!data.volunteers) data.volunteers = [];

    if (!add) {
    } else if (data.volunteers.includes(userName)) {
        return "User already Signed Up";
    } else if (add) {
        data.volunteers.push(userName);
    }
    await set(ref(db, `/volunteer-dates/${dateID}/`), { ...data }).catch(
        (e) => {
            errorMessage = e;
        }
    );

    if (errorMessage !== "") return errorMessage;
    else return "success";
};

export const getSignedInUserInfoFB = async (uid) => {
    try {
        const docRef = doc(firestoredb, "users", uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch {
        return "No user signed in";
    }
};

export const getAllUsersFB = async () => {
    let data = [];
    const querySnapshot = await getDocs(collection(firestoredb, "users"));

    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
};

export const getSignedInUserFB = async () => {
    return getAuth();
};

export const getSignedInUserNameFB = async () => {
    try {
        const docRef = doc(firestoredb, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data().name;
    } catch {
        return "No user signed in";
    }
};

export const changeDateFB = async (newData) => {
    let errorMessage = "";
    await set(ref(db, `/volunteer-dates/${newData.id}/`), { ...newData })
        .then((e) => {
            console.log(e);
        })
        .catch((e) => {
            errorMessage = e;
        });

    if (errorMessage !== "") return errorMessage;
};

export const signOutUser = async () => {
    await signOut(auth);
};

export const getSearchQueryBooks = async (req, res) => {
    let books = [],
        booksRequest;

    if (!req.body.title) {
        res.status(400);
        throw new Error("Missing Title");
    }

    if (req.body.mode === "titleSearch") {
        booksRequest = await axios.get(
            GOOGLE_BOOKS_API_BASE_URL + req.body.title
        );
    } else {
        booksRequest = await axios.get(
            GOOGLE_BOOKS_API_BASE_URL + "isbn:" + req.body.title
        );
    }

    try {
        if (!booksRequest.data.items) {
            res.send("Error");
        } else {
            for (let i = 0; i < booksRequest.data.items.length; i++) {
                books.push(booksRequest.data.items[i]);
            }
            res.send(books);
        }
    } catch {
        res.send("Error");
    }
};
