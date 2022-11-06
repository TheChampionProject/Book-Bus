import asyncHandler from "express-async-handler";
import { getBooksFB, setBookFB } from "./firebase.js";

const getBooks = asyncHandler(async (req, res) => {
    res.send(await getBooksFB());
});


const setBook = asyncHandler(async (req, res) => {
    if (!req.body.book) {
        res.status(400);
        throw new Error("Missing Book");
    }
    try {
        await setBookFB(req.body.book, req.body.index);
    } catch {}
});

export { getBooks, setBook };
