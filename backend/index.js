import express, { json, urlencoded } from "express";
import cors from "cors";
import { getBooks, setBook, signup, login, resetPassword, verify } from "./apiController.js";
import multer from "multer";

const app = express();
const port = process.env.PORT || 5000;
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    // allow a maximum of 5 files to be uploaded and a maximum file size of 5MB
    limits: {files: 1, fileSize: 10 * 1024 * 1024}
});

app.use(
    cors({
        origin: "*",
    })
);

app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/getBooks", getBooks);
app.post("/manageBook", setBook);
app.post("/signup", signup);
app.post("/login", login)
app.post("/reset", resetPassword)
app.post("/verify", upload.single("verificationFile"), verify)

app.listen(port, () => console.log(`Server started on ${port}!`));
