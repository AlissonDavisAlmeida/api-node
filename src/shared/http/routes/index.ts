import { productsRouter } from "@domain/products/routes/productsRouter";
import { passwordRouter } from "@domain/users/routes/passwordRouters";
import { profileRouters } from "@domain/users/routes/profileRouters";
import { sessionsRouter } from "@domain/users/routes/sessionsRouters";
import { userRouters } from "@domain/users/routes/userRouters";
import { Router } from "express";

export const router = Router();

router.use("/products", productsRouter);
router.use("/users", userRouters);
router.use("/profile", profileRouters);
router.use("/sessions", sessionsRouter);
router.use("/password", passwordRouter);
