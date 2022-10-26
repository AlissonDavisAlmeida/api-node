import { RedisCache } from '@shared/cache/RedisCache';
import { AppError } from '@shared/http/AppError';
import { getCustomRepository } from 'typeorm';
import { Products } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repository/ProductRepository';

interface CreateProductDTO {
  name: string;
  price: number;
  quantity: number;
}

export class CreateProduct {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  async execute(input: CreateProductDTO): Promise<Products> {
    const productExists = await this.productRepository.findByName(input.name);
    const redisCache = new RedisCache()

    if (productExists) {
      throw new AppError('Product already exists', 400);
    }

    const product = this.productRepository.create(input);

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await this.productRepository.save(product);

    return product;
  }
}
