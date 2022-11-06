import express, { json, urlencoded } from "express";
import apiRoutes from "./apiRoutes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(
    cors({
        origin: "*",
    })
);

app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/api/", apiRoutes);

app.listen(port, () => console.log(`Server started on ${port}!`));
