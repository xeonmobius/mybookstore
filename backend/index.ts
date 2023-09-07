import { Elysia } from "elysia";
import { PORT } from "./config";
const app = new Elysia().get("/", () => "Hello Elysia").listen(PORT);

console.log(
  `🦊 Elysia is running at ${app.server!.hostname}:${app.server!.port}`
);
