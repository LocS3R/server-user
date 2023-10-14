import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import corsOptions from "./config/corsOptions.js";
import credentials from "./middleware/credentials.js";

import rootRouter from "./routers/root.js";
import regisRouter from "./routers/register.js";
import usersRouter from "./routers/users.js";
import authRouter from "./routers/auth.js";
import refreshRouter from "./routers/refresh.js";
import logoutRouter from "./routers/logout.js";
import employeesRouter from "./routers/api/employees.js";

import verifyJWT from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import connectDB from "./config/dbConn.js";
const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", rootRouter);
app.use("/register", regisRouter);
app.use("/auth", authRouter);
app.use("/refresh", refreshRouter);
app.use("/logout", logoutRouter);

app.use(verifyJWT);
app.use("/users", usersRouter);
app.use("/employees", employeesRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 not found" });
  } else {
    res.type("txt").send("404 not found");
  }
});

// console.log(__dirname);

// app.listen(PORT, () => console.log(`Litening on port ${PORT}`));
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  // logEvents(
  //   `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
  //   "mongoErrLog.log",
  // );
});
