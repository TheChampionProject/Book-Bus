import express, { json, urlencoded } from "express";
import cors from "cors";
import { getBooks, setBook } from "./apiController.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(
    cors({
        origin: "*",
    })
);

app.use(json());
app.use(urlencoded({ extended: false }));

app.get("/getBooks", getBooks);
app.put("/manageBook", setBook);

app.listen(port, () => console.log(`Server started on ${port}!`));
