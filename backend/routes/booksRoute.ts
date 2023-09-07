import express, { Request, Response } from "express";
import { Book } from "../models/bookModel.ts";

const router = express.Router();

// Route for Saving a new Book
router.post("/", async (request: Request, response: Response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({ message: "All fields are required" });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = new Book(newBook);
    const savedBook = await book.save();
    return response.status(201).send(savedBook);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for Fetching all Books
router.get("/", async (request: Request, response: Response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for Fetching a single Book
router.get("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById({ _id: request.params.id });
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for Updating a Book
router.put("/:id", async (request: Request, response: Response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({ message: "All fields are required" });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route for Deleting a Book
router.delete("/:id", async (request: Request, response: Response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book deleted" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
