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

export const getBookPrice = asyncHandler(async (req, res) => {
    //    ISBN = req.body.ISBN;
    //
    //    let priceRequest = await axios.get(
    //        BOOKS_RUN_API_BASE_URL + ISBN + "?key=" + process.env.BOOKS_RUN_API_KEY
    //    );
    //    if (priceRequest.data.result.status === "error") {
    //        res.send("Price Not Found");
    //        return;
    //    }
    //
    //    if (priceRequest.data.result.offers.booksrun.new !== "none")
    //        price = priceRequest.data.result.offers.booksrun.new;
    //    else if (priceRequest.data.result.offers.booksrun.used !== "none")
    //        price = priceRequest.data.result.offers.booksrun.used;
    //    else if (priceRequest.data.result.offers.marketplace[0].new !== "none")
    //        price = priceRequest.data.result.offers.marketplace[0].new;
    //    else if (priceRequest.data.result.offers.marketplace[0].used !== "none")
    //        price = priceRequest.data.result.offers.marketplace[0].used.price;
    //    else price = "Price Not Found";
    //
    //    res.send(price);

    //const options = {
    //    method: 'GET',
    //    url: 'https://amazon-data-scrapper3.p.rapidapi.com/search/Macbook%20Air',
    //    params: {api_key: '10518d369acaf28f525da1e0e8039add'},
    //    headers: {
    //      'X-RapidAPI-Key': '89e1b594dfmsh2024736d3904237p19b4f0jsn98c7c21416a6',
    //      'X-RapidAPI-Host': 'amazon-data-scrapper3.p.rapidapi.com'
    //    }
    //  };

    //const PRICEOPTIONS = {
    //    method: "GET",
    //    url: "https://axesso-axesso-amazon-data-service-v1.p.rapidapi.com/v2/amz/amazon-lookup-prices",
    //    params: { page: "1", domainCode: "com", asin: "B07QFC6LN6" },
    //    headers: {
    //        "X-RapidAPI-Key":
    //            "89e1b594dfmsh2024736d3904237p19b4f0jsn98c7c21416a6",
    //        "X-RapidAPI-Host":
    //            "axesso-axesso-amazon-data-service-v1.p.rapidapi.com",
    //    },
    //};

    //await axios
    //    .request(options)
    //    .then((response) => {
    //        console.log(response.data);
    //    })
    //    .catch((error) => {
    //        console.error(error);
    //    });

    //const options = {
    //    method: "GET",
    //    url: "",
    //   ,

    //    headers = {
    //
    //    };
    //
    //    const request = await axios({
    //        url: `https://amazon-data-scraper58.p.rapidapi.com/search/book`,
    //        headers: headers,
    //        method: "GET",
    //    });

    const request = axios({
        method: "GET",
        url: "https://amazon-data-scraper58.p.rapidapi.com/search/book",
        headers: {
            "content-type": "application/octet-stream",
            "X-RapidAPI-Key":
                "89e1b594dfmsh2024736d3904237p19b4f0jsn98c7c21416a6",
            "X-RapidAPI-Host": "amazon-data-scraper58.p.rapidapi.com",
        },
    });
    console.log(request.data);
    //await axios
    //    .request(options)
    //    .then(function (response) {
    //        console.log(response.data);
    //    })
    //    .catch((error) => {
    //        console.error(error);
    //    });
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
    res.send(await updateVolunteerDateFB(req.body.dateID));
});

export const changeDate = asyncHandler(async (req, res) => {
    res.send(await changeDateFB(req.body.newData));
});

export const getSignedInUser = asyncHandler(async (req, res) => {
    res.send(await getSignedInUserFB());
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
