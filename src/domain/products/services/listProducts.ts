import { RedisCache } from '@shared/cache/RedisCache';
import { getCustomRepository } from 'typeorm';
import { Products } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repository/ProductRepository';

export class ListProducts {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  async execute(): Promise<Products[]> {

    const redisCache = new RedisCache()

    let products = await redisCache.recover<Products[]>('api-vendas-PRODUCT_LIST')

    if (!products) {

      products = await this.productRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products)
    }

    return products;
  }
}
