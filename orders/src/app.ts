import express from "express";
import "express-async-errors";
import { json } from "body-parser";

import cookieSession from "cookie-session";

import { errorHandler, NotFoundError, currentUser } from "@michytickets/common";
import { deleteOrderRouter } from "./routes/delete";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";
import { indexOrderRouter } from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(newOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
