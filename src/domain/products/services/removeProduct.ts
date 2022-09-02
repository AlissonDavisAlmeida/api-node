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

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await this.productRepository.remove(product);
  }
}
