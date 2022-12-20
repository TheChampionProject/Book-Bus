import express, { json, urlencoded } from "express";
import cors from "cors";
import {
    getAllBooks,
    setBook,
    getSearchQueryBooks,
    getBookPrice,
    signup,
    login,
    resetPassword,
    verify,
    getVolunteerDates,
    signUpForDate,
    getSignedInUser,
    changeDate,
    logout
} from "./apiController.js";
import multer from "multer";

const app = express();
const port = process.env.PORT || 5000;
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    // allow a maximum of 5 files to be uploaded and a maximum file size of 5MB
    limits: { files: 1, fileSize: 10 * 1024 * 1024 },
});

app.use(
    cors({
        origin: "*",
    })
);

app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/getAllBooks", getAllBooks);
app.post("/getSearchQueryBooks", getSearchQueryBooks);
app.post("/getBookPrice", getBookPrice);
app.put("/setBook", setBook);

app.post("/signup", signup);
app.post("/login", login);
app.post("/reset", resetPassword);
app.post("/verify", upload.single("verificationFile"), verify);
app.get("/getDates", getVolunteerDates);
app.post("/signUpForDate", signUpForDate);
app.get("/getSignedInUser", getSignedInUser);
app.post("/changeDate", changeDate);
app.post("/logout", logout)

app.listen(port, () => console.log(`Server started on ${port}!`));
