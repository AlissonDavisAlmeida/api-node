import { getCustomRepository } from 'typeorm';
import { Products } from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repository/ProductRepository';

export class ListProducts {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = getCustomRepository(ProductRepository);
  }

  async execute(): Promise<Products[]> {
    const products = await this.productRepository.find();

    return products;
  }
}
