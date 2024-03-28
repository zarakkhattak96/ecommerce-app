import { EntityManager, Repository } from "typeorm";
import { NotFoundError } from "../../../app/app.errors";
import {
  ProductInterface,
  ProductBaseRepoInterface,
} from "../../../domain/interfaces/product/product.interface";

import { ProductModel } from "../models/product/product.model";
import ds from "@infra/config/connection.config";

export class ProductRepositoryClass implements ProductBaseRepoInterface {
  private prodBaseRepo: Repository<ProductModel>;
  constructor() {
    this.prodBaseRepo = new Repository(ProductModel, new EntityManager(ds));
  }

  async insert(product: ProductInterface) {
    const createProd = this.prodBaseRepo.create(product);

    return await this.prodBaseRepo.save(createProd);
  }

  async fetch(id: number) {
    const fetchProd = await this.prodBaseRepo.findOne({
      where: { id: id },
      relations: ["purchases"],
    });

    if (!fetchProd) throw new NotFoundError(`No product found with id: ${id}`);

    return fetchProd;
  }

  async fetchAll() {
    const fetchProds = await this.prodBaseRepo.find({
      relations: ["purchases"],
    });

    if (!fetchProds)
      throw new NotFoundError("No products available at the moment");

    return fetchProds;
  }

  async update(prodId: number, prod: ProductInterface) {
    await this.prodBaseRepo.update({ id: prodId }, prod);

    const updatedProduct = await this.prodBaseRepo.findOne({
      where: { id: prodId },
      relations: ["purchases"],
    });

    if (!updatedProduct) throw new NotFoundError("No product was updated");

    return updatedProduct;
  }

  async delete(id: number) {
    const fetchProdById = await this.prodBaseRepo.findOne({
      where: { id: id },
      relations: ["purchases"],
    });

    if (!fetchProdById)
      throw new NotFoundError(`No product found with id: ${id}`);

    return await this.prodBaseRepo.remove(fetchProdById);
  }
}
