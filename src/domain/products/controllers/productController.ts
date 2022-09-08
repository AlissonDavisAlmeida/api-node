import { Request, Response } from 'express';
import { CreateProduct } from '../services/createProduct';
import { ListProducts } from '../services/listProducts';
import { RemoveProduct } from '../services/removeProduct';
import { ShowProduct } from '../services/showProduct';
import { UpdateProducts } from '../services/updateProduct';

export class ProductsController {
  async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProducts();

    const products = await listProducts.execute();

    return response.json(products);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const showProduct = new ShowProduct();

    const product = await showProduct.execute(id);

    return response.json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProduct();

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;

    const updateProduct = new UpdateProducts();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const removeProduct = new RemoveProduct();

    await removeProduct.execute(id);

    return response.json([]);
  }
}
