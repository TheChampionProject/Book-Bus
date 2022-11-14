import asyncHandler from "express-async-handler";
import { getBooksFB, setBookFB } from "./firebase.js";
import axios from "axios";

const GOOGLE_BOOKS_API_BASE_URL =
    "https://www.googleapis.com/books/v1/volumes?q=";

const getBooks = asyncHandler(async (req, res) => {
    res.send(await getBooksFB());
});

const setBook = asyncHandler(async (req, res) => {
    if (!req.body.newBook) {
        res.status(400);
        throw new Error("Missing Book");
    }

    let fbRequest = await setBookFB(req.body.newBook);
    if (fbRequest === "success") res.send("success"); // This feels crude
    else res.send("failure");
});

const searchForBook = asyncHandler(async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error("Missing Title");
    }

    let searchRequest = await axios.get(
        GOOGLE_BOOKS_API_BASE_URL + req.body.title
    );
    console.log(searchRequest.data.items[0].volumeInfo);
});

export { getBooks, setBook, searchForBook };
