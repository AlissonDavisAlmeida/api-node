import { authConfig } from "@config/auth";
import { AppError } from "@shared/http/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const isAuthenticated = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing.");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded;

    request.user = {
      id: sub as string,
    };

    return next();
  } catch (err: any) {
    throw new AppError("Invalid JWT token.");
  }
};
