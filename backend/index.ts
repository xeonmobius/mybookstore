import express, { Request, Response } from "express";
import { PORT, mongodbURL } from "./config";
import mongoose from "mongoose";
import { Book } from "./models/bookModel";
import booksRoute from "./routes/booksRoute";
import cors from "cors";

const app = new express();

// Middleware to parse JSON from request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.get("/", (request: Request, response: Response) => {
  console.log(request);
  return response.status(234).send("Hello World!");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
