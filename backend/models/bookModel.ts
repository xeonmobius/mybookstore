import mongoose from "mongoose";

interface IBook {
  title: string;
  author: string;
  publishYear: number;
}

const bookSchema = new mongoose.Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
