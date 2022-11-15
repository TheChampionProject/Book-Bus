import asyncHandler from "express-async-handler";
import { getBooksFB, setBookFB } from "./firebase.js";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

let ISBN, price;

const GOOGLE_BOOKS_API_BASE_URL =
    "https://www.googleapis.com/books/v1/volumes?q=";

const BOOKS_RUN_API_BASE_URL = "https://booksrun.com/api/v3/price/buy/";

const getBooks = asyncHandler(async (req, res) => {
    res.send(await getBooksFB());
});

const setBook = asyncHandler(async (req, res) => {
    if (!req.body.newBook) {
        res.status(400);
        throw new Error("Missing Book");
    }

    let fbRequest = await setBookFB(req.body.newBook);
    if (fbRequest === "success") res.send("success");
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
        searchRequest.data.items[3].volumeInfo.industryIdentifiers[0]
            .identifier;

    try { // If Google Books has the list price already
        price =
            "Google Price " +
            searchRequest.data.items[3].saleInfo.listPrice.amount;
    } catch { // Ask BooksRun API for the list price or used price
        let priceRequest = await axios.get(
            BOOKS_RUN_API_BASE_URL +
                ISBN +
                "?key=" +
                process.env.BOOKS_RUN_API_KEY
        );

        if ((price = priceRequest.data.result.offers.booksrun.new !== "none"))
            price = "new price " + priceRequest.data.result.offers.booksrun.new;
        else if (
            (price = priceRequest.data.result.offers.booksrun.used !== "none")
        )
            price =
                "used price " + priceRequest.data.result.offers.booksrun.used;
        else price = "Price Not Found";
    }

    console.log(price);
});

export { getBooks, setBook, searchForBook };
