import asyncHandler from "express-async-handler";
import {
    getBooksFB,
    setBookFB,
    signUpAuth,
    signInAuth,
    resetPasswordAuth,
    bookBusVerify,
    getVolunteerDatesFB,
    updateVolunteerDateFB,
    getSignedInUserFB,
    changeDateFB,
    signOutUser,
    getSignedInUserNameFB,
    getSignedInUserInfoFB,
} from "./firebase.js";

import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

let ISBN, price, fbRequest;

const GOOGLE_BOOKS_API_BASE_URL =
    "https://www.googleapis.com/books/v1/volumes?q=";

const BOOKS_RUN_API_BASE_URL = "https://booksrun.com/api/v3/price/buy/";

export const getAllBooks = asyncHandler(async (req, res) => {
    res.send(await getBooksFB());
});

export const getSearchQueryBooks = asyncHandler(async (req, res) => {
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
});

// Can update a book, add a book, and archive a book
export const setBook = asyncHandler(async (req, res) => {
    if (!req.body.newBook) {
        res.status(400);
        throw new Error("Missing Book");
    }

    fbRequest = await setBookFB(req.body.newBook.managedBook, "active");
    if (fbRequest === "failure") res.send("failure");

    if (req.body.newBook.gift)
        fbRequest = await setBookFB(req.body.newBook.managedBook, "archive");

    if (fbRequest === "success") res.send("success");
    else res.send("failure");
});

export const signup = asyncHandler(async (req, res) => {
    try {
        res.send(
            await signUpAuth(
                req.body.email,
                req.body.password,
                req.body.first,
                req.body.last
            )
        );
    } catch (err) {
        res.json(err);
    }
});

export const login = asyncHandler(async (req, res) => {
    res.send(await signInAuth(req.body.email, req.body.password));
});

export const resetPassword = asyncHandler(async (req, res) => {
    try {
        await resetPasswordAuth(req.body.email);
    } catch (err) {
        res.json(err);
    }
});

export const verify = asyncHandler(async (req, res) => {
    res.send(await bookBusVerify(req.file));
});

export const getVolunteerDates = asyncHandler(async (req, res) => {
    res.send(await getVolunteerDatesFB());
});

export const signUpForDate = asyncHandler(async (req, res) => {
    for (let i = 0; i < req.body.dateIDs.length; i++) {
        let fbRequest = await updateVolunteerDateFB(req.body.dateIDs[i], true);
        if (fbRequest === "failure") {
            res.send("failure");
            return;
        }
    }

    for (let i = 0; i < req.body.unselectedDateIDs.length; i++) {
        let fbRequest = await updateVolunteerDateFB(
            req.body.unselectedDateIDs[i],
            false
        );
        if (fbRequest === "failure") {
            res.send("failure");
            return;
        }
    }

    res.send("success");
});

export const changeDate = asyncHandler(async (req, res) => {
    res.send(await changeDateFB(req.body.newData));
});

export const getSignedInUserName = asyncHandler(async (req, res) => {
    res.send(await getSignedInUserNameFB());
});

export const logout = asyncHandler(async (req, res) => {
    res.send(await signOutUser());
});

export const getSignedInUserInfo = asyncHandler(async (req, res) => {
    res.send(await getSignedInUserInfoFB());
});

export const getSignedInUser = asyncHandler(async (req, res) => {
    res.send(await getSignedInUserFB());
});
