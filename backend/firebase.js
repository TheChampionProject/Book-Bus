import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, child } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
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

    await get(child(dbRef, `/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                databaseBooks.push(snapshot.val());
            } else {
                return "No Data Found";
            }
        })
        .catch((error) => {
            return error;
        });

    return databaseBooks;
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

const signUpAuth = async (email, password, first, last) => {
    const currentUser = await createUserWithEmailAndPassword(auth, email, password)
        .catch((e) => {
            return e;
    });
    await setDoc(doc(firestoredb, "users", currentUser.user.uid), {
        email: email,
        name: first + " " + last,
        password: password,
        watchedVideo: false,
        uploadedForm: false,
    }).catch((e) => {
        return e;
    });
    return currentUser;
}

const signInAuth = async(email, password) => {
    const currentUser = await signInWithEmailAndPassword(auth, email, password)
        .catch((e) => {
            return e;
        })
    return currentUser;
}

const resetPasswordAuth = async(email) => {
    await sendPasswordResetEmail(auth, email)
         .catch((e) => {
            return e;
        })
}

const bookBusVerify = async (verificationFile) => {
    console.log("hello")
    const targetRef = storageRef(storage, `test/img1`);
    await uploadBytes(targetRef, verificationFile.buffer).then(async () => {
        console.log("hello")
        await updateDoc(doc(firestoredb, "users", auth.currentUser.uid), {
            watchedVideo: true,
            uploadedForm: true,
        })
    }) 
}

export { getBooksFB, setBookFB, signUpAuth, signInAuth, resetPasswordAuth, bookBusVerify };
