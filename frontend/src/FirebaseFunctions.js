import { initializeApp } from "firebase/app";
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
    updateDoc,
    getDoc,
} from "firebase/firestore";
import dotenv from "dotenv";
import { firebaseConfig } from "../keys.js";

dotenv.config()

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestoredb = getFirestore(app);

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
        watchedVideo: false,
        uploadedForm: false,
    }).catch((e) => {
        return e;
    });
    return currentUser;
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

export const getSignedInUserNameFB = async () => {
    try {
        const docRef = doc(firestoredb, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data().name;
    } catch {
        return "No user signed in";
    }
};

export const getSignedInUserInfoFB = async () => {
    try {
        const docRef = doc(firestoredb, "users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch {
        return "No user signed in";
    }
};

export const signOutUser = async () => {
    await signOut(auth);
};

export const signUpForDate = async(selectedDateIDs, unselectedDateIDs) => {
    const userName = await getSignedInUserNameFB();
    return await axios.post(
        process.env.REACT_APP_BACKEND_URL + "signUpForDate",
        {
            dateIDs: selectedDateIDs,
            unselectedDateIDs: unselectedDateIDs,
            userName: userName,
        }
    );
};

export const verify = async(bodyFormData) => {
    const docRef = doc(firestoredb, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const userName = docSnap.data().name;

    await axios({
        method: "post",
        url: process.env.REACT_APP_BACKEND_URL + "verify",
        data: {
            verificationFile: bodyFormData, 
            userName: userName,
        },
        headers: { "Content-Type": "multipart/form-data" },
    }).then( async () => {
        await updateDoc(docRef, {
            watchedVideo: true,
            uploadedForm: true,
        });
    });
};

export const sendPasswordReset = async(email) => {
    await sendPasswordResetEmail(auth, email);
}