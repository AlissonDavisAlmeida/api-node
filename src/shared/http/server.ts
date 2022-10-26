import "reflect-metadata";
import "dotenv/config";
import uploadConfig from "@config/upload.config";
import "@shared/typeorm";
import { errors } from "celebrate";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import rateLimiter from "@shared/http/middlewares/rateLimiter";

import { pagination } from "typeorm-pagination";
import { AppError } from "./AppError";
import { router } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter)

app.use(pagination);
app.use("/files", express.static(uploadConfig.directory));

app.use(router);

app.use(errors());

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: `Internal Server Error ${err.message}`,
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
