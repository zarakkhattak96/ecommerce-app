import { Repository } from 'typeorm';
import { AppError, NotFoundError } from '../../../app/app.errors';
import {
  ProductInterface,
  ProductBaseRepo,
} from '../../../domain/interfaces/product/product.interface';

import { ProductModel } from '../models/product/product.model';

export class ProductRepositoryClass implements ProductBaseRepo {
  private prodRepo: Repository<ProductModel>;

  constructor(repo: Repository<ProductModel>) {
    this.prodRepo = repo;
  }

  async insert(product: ProductInterface) {
    const createProd = this.prodRepo.create(product);

    return await this.prodRepo.save(createProd);
  }

  async fetch(id: number) {
    const fetchProd = await this.prodRepo.findOne({ where: { id: id } });

    if (!fetchProd) throw new NotFoundError(`No product found with id: ${id}`);

    return fetchProd;
  }

  async fetchAll() {
    const fetchProds = await this.prodRepo.find();
    return fetchProds;
  }

  async update(prod: ProductInterface) {
    await this.prodRepo.update({ id: prod.id }, prod);

    const updated = await this.prodRepo.findOne({ where: { id: prod.id } });

    if (!updated) throw new AppError('Product cannot be updated');

    return updated;
  }

  async delete(id: number) {
    const fetchProdById = await this.prodRepo.findOne({
      where: { id: id },
      // relations: ['users'],  //TODO: To fix the relations issue between product and user: HINT: primary and foreign key constraints
    });

    if (!fetchProdById)
      throw new NotFoundError(`No product found with id: ${id}`);

    return await this.prodRepo.remove(fetchProdById);
  }
}
