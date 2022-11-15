import asyncHandler from "express-async-handler";
import { getBooksFB, setBookFB } from "./firebase.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

let ISBN;

const GOOGLE_BOOKS_API_BASE_URL =
    "https://www.googleapis.com/books/v1/volumes?q=";

const BOOKS_RUN_API_BASE_URL = `https://booksrun.com/api/v3/price/buy/0439887453?key=${process.env.BOOKS_RUN_API_KEY}`;

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

    ISBN =
        searchRequest.data.items[0].volumeInfo.industryIdentifiers[0]
            .identifier;

    console.log(ISBN);

    let price = await axios.get(BOOKS_RUN_API_BASE_URL);

    console.log(price.data.result.offers.booksrun);
});

export { getBooks, setBook, searchForBook };
