import asyncHandler from "express-async-handler";
import { getBooksFB, setBookFB } from "./firebase.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

let ISBN, price, fbRequest;

const GOOGLE_BOOKS_API_BASE_URL =
    "https://www.googleapis.com/books/v1/volumes?q=";

const BOOKS_RUN_API_BASE_URL = "https://booksrun.com/api/v3/price/buy/";

const getAllBooks = asyncHandler(async (req, res) => {
    res.send(await getBooksFB());
});

const getSearchQueryBooks = asyncHandler(async (req, res) => {
    let books = [];

    if (!req.body.title) {
        res.status(400);
        throw new Error("Missing Title");
    }

    let booksRequest = await axios.get(
        GOOGLE_BOOKS_API_BASE_URL + req.body.title
    );

    for (let i = 0; i < booksRequest.data.items.length; i++) {
        books.push(booksRequest.data.items[i]);
    }

    res.send(books);
});

const getBookPrice = asyncHandler(async (req, res) => {
    ISBN = req.body.ISBN;

    let priceRequest = await axios.get(
        BOOKS_RUN_API_BASE_URL + ISBN + "?key=" + process.env.BOOKS_RUN_API_KEY
    );

    if ((price = priceRequest.data.result.offers.booksrun.new !== "none"))
        price = priceRequest.data.result.offers.booksrun.new;
    else if ((price = priceRequest.data.result.offers.booksrun.used !== "none"))
        price = priceRequest.data.result.offers.booksrun.used;
    else price = "Price Not Found";

    res.send(price);
});

// Can update a book, add a book, and archive a book
const setBook = asyncHandler(async (req, res) => {
    if (!req.body.newBook) {
        res.status(400);
        throw new Error("Missing Book");
    }

    if (req.body.newBook.Archive)
        fbRequest = await setBookFB(req.body.newBook, "archive");
    else fbRequest = await setBookFB(req.body.newBook, "active");

    if (fbRequest === "success") res.send("success");
    else res.send("failure");
});

export { getAllBooks, setBook, getSearchQueryBooks, getBookPrice };
