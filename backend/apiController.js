import asyncHandler from "express-async-handler";
import { getBooksFB, setBookFB, signUpAuth, signInAuth, resetPasswordAuth, bookBusVerify } from "./firebase.js";

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
    } catch (err) {
        res.json(err);
    }
});

const signup = asyncHandler(async (req, res) => {
    try {
        res.send(await signUpAuth(req.body.email, req.body.password, req.body.first, req.body.last))
    } catch(err) {
        res.json(err);
    }
})

const login = asyncHandler(async (req,res) => {
    try{
        res.send(await signInAuth(req.body.email, req.body.password));
    } catch(err) {
        res.json(err)
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    try {
        await resetPasswordAuth(req.body.email);
    } catch (err) {
        res.json(err);
    }
})

const verify = asyncHandler(async (req, res) => {
    await bookBusVerify(req.file)
    res.send("success");

})

export { getBooks, setBook, signup, login, resetPassword, verify };
