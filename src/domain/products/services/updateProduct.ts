import { RedisCache } from '@shared/cache/RedisCache';
import { AppError } from '@shared/http/AppError';
import { getCustomRepository } from 'typeorm';
import { Products } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repository/ProductRepository';

interface IUpdateProductDTO {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export class UpdateProducts {
  private productsRepository: ProductRepository;

  constructor() {
    this.productsRepository = getCustomRepository(ProductRepository);
  }

  async execute({
    id, name, price, quantity,
  }: IUpdateProductDTO): Promise<Products> {
    const product = await this.productsRepository.findOne(id);
    const redisCache = new RedisCache()

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError('There is already one product with this name');
    }

    Object.assign(product, {
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST')

    await this.productsRepository.save(product);

    return product;
  }
}
