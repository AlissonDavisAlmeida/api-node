import { AppError } from '@shared/http/AppError';
import { getCustomRepository } from 'typeorm';
import { Products } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repository/ProductRepository';

export class ShowProduct {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  async execute(id: string): Promise<Products> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    return product;
  }
}
