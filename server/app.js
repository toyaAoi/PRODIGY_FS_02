import express from "express";
import "express-async-errors";

import employeeRouter from "./routes/employeeRoute.js";
import authRouter from "./routes/authRoute.js";
import resetRouter from "./routes/resetRoute.js";

import requestLogger from "./middlewares/requestLogger.js";
import errorHandlers from "./middlewares/errorHandlers.js";
import connectDB from "./database/dbConnection.js";
import authInputValidation from "./middlewares/authInputValidation.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();

connectDB();

app.use(express.json());

app.use(requestLogger);

app.get("/hello", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", authInputValidation, authRouter);
app.use("/api/employees", authMiddleware, employeeRouter);

app.use("/api/reset", resetRouter);

app.use(errorHandlers.unknownEndpoint);
app.use(errorHandlers.errorHandler);

export default app;
