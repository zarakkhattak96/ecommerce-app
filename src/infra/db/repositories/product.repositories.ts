import { Repository } from 'typeorm';
import { AppError, NotFoundError } from '../../../app/app.errors';
import {
  ProductInterface,
  ProductBaseRepo,
} from '../../../domain/interfaces/product/product.interface';

import { ProductModel } from '../models/product/product.model';

export class ProductRepositoryClass implements ProductBaseRepo {
  private prodBaseRepo: Repository<ProductModel>;

  constructor(repo: Repository<ProductModel>) {
    this.prodBaseRepo = repo;
  }

  async insert(product: ProductInterface) {
    const createProd = this.prodBaseRepo.create(product);

    return await this.prodBaseRepo.save(createProd);
  }

  async fetch(id: number) {
    const fetchProd = await this.prodBaseRepo.findOne({
      where: { id: id },
      relations: ['users'],
    });

    if (!fetchProd) throw new NotFoundError(`No product found with id: ${id}`);

    return fetchProd;
  }

  async fetchAll() {
    const fetchProds = await this.prodBaseRepo.find({ relations: ['users'] });

    if (!fetchProds)
      throw new NotFoundError('No products available at the moment');

    return fetchProds;
  }

  //TODO: To fix the update query
  async update(prod: ProductInterface) {
    console.log(prod.id, 'repos id');

    await this.prodBaseRepo.update({ id: prod.id }, prod);

    const updatedProduct = await this.prodBaseRepo.findOne({
      where: { id: prod.id },
      relations: ['users'],
    });
    // console.log(updated, 'UPDATE BODY');

    // console.log(updatedProduct, 'UPDATED');
    if (!updatedProduct) throw new NotFoundError('No product was updated');

    return updatedProduct;
  }

  async delete(id: number) {
    const fetchProdById = await this.prodBaseRepo.findOne({
      where: { id: id },
      relations: ['users'],
    });

    if (!fetchProdById)
      throw new NotFoundError(`No product found with id: ${id}`);

    return await this.prodBaseRepo.remove(fetchProdById);
  }
}
