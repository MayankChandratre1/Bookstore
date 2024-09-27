import express from "express";
import { buyBook, createBook, deletebook, getBook, getBoughtBooks, getMyBooks } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/mybooks", getMyBooks);
router.post("/", createBook);
router.post("/buyBook", buyBook); 
router.post("/deletebook", deletebook); 
router.post("/boughtbooks", getBoughtBooks); 
export default router;