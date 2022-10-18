import { EntityRepository, In, Repository } from "typeorm";
import { Products } from "../entities/Product";

interface IFindProducts {
  id: string;
}

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

  async findAllById(products: IFindProducts[]): Promise<Products[]> {
    const productsIds = products.map((product) => product.id);

    const existentProducts = await this.find({
      where: {
        id: In(productsIds),
      },
    });

    return existentProducts;
  }
}
