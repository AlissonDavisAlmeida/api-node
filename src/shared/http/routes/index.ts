import { productsRouter } from "@domain/products/routes/productsRouter";
import { passwordRouter } from "@domain/users/routes/passwordRouters";
import { sessionsRouter } from "@domain/users/routes/sessionsRouters";
import { userRouters } from "@domain/users/routes/userRouters";
import { Router } from "express";

export const router = Router();

router.use("/products", productsRouter);
router.use("/users", userRouters);
router.use("/sessions", sessionsRouter);
router.use("/password", passwordRouter);
