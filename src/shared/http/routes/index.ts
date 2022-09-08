import { productsRouter } from '@domain/products/routes/productsRouter';
import { userRouters } from '@domain/users/routes/userRouters';
import { Router } from 'express';

export const router = Router();

router.use('/products', productsRouter);
router.use('/users', userRouters);
