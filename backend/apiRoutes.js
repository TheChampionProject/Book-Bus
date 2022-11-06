import express from "express";
const router = express.Router();
import { getBooks, setBook } from "./apiController.js";

router.get("/getBooks", getBooks);
router.put("/manageBook", setBook);

export default router;
