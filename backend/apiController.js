import asyncHandler from "express-async-handler";
import { getBooksFB, setBookFB } from "./firebase.js";

const getBooks = asyncHandler(async (req, res) => {
    res.send(await getBooksFB());
});

const setBook = asyncHandler(async (req, res) => {
    console.log(req.body.newBook);
    if (!req.body.newBook) {
        res.status(400);
        throw new Error("Missing Book");
    }
    try {
        await setBookFB(req.body.newBook);
        console.log("Manged Book Successfully");
    } catch (err) {
        res.json(err);
    }
});

export { getBooks, setBook };
