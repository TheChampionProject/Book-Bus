import express, { json, urlencoded } from "express";
import cors from "cors";
import {
    getAllBooks,
    setBook,
    getSearchQueryBooks,
    getBookPrice,
    getVolunteerDates,
} from "./apiController.js";

const app = express();
const port = process.env.PORT || 5000;

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
app.get("/getDates", getVolunteerDates);

app.listen(port, () => console.log(`Server started on ${port}!`));
