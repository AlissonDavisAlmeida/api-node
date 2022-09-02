import { EntityRepository, Repository } from 'typeorm';
import { Products } from '../entities/Product';

@EntityRepository(Products)
export class ProductRepository extends Repository<Products> {
  async findByName(name: string): Promise<Products | undefined> {
    const product = this.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}
