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

    let fbRequest = await setBookFB(req.body.newBook);
    if (fbRequest === "success") {
        console.log("Firebase request successful");
        res.send("success");
    }
});

export { getBooks, setBook };
