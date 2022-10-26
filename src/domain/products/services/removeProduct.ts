import { RedisCache } from '@shared/cache/RedisCache';
import { AppError } from '@shared/http/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repository/ProductRepository';

export class RemoveProduct {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findOne(id);
    const redisCache = new RedisCache()

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await this.productRepository.remove(product);
  }
}
