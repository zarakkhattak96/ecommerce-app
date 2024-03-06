import { Repository } from 'typeorm';
import { AppError, NotFoundError } from '../../../app/app.errors';
import {
  ProductInterface,
  ProductRepo,
} from '../../../domain/interfaces/product/product.interface';

import { ProductModel } from '../models/product/product.model';

export class ProductRepositoryClass implements ProductRepo {
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
    const fetchProdById = await this.prodRepo.findOne({ where: { id: id } });

    if (!fetchProdById)
      throw new NotFoundError(`No product found with id: ${id}`);

    return await this.prodRepo.remove(fetchProdById);
  }
}

// export class ProductRepository implements ProductRepo {
//   // insert Product

//   insert = async (prod: ProductInterface) => {
//     const newProduct = await ProductModel.create(prod);
//     return newProduct;
//   };

//   fetch = async (id: string) => {
//     const fetchById = await ProductModel.findById(id);

//     if (fetchById === null)
//       throw new NotFoundError(`No product found with id ${id}`);

//     return fetchById;
//   };

//   fetchAll = async () => {
//     const fetchAll = await ProductModel.find();

//     return fetchAll;
//   };

//   update = async (prod: ProductInterface) => {
//     const updateProduct = await ProductModel.findOneAndUpdate(prod);

//     if (updateProduct === null)
//       throw new NotFoundError('No product available to update');

//     return updateProduct;
//   };

//   delete = async (id: number) => {
//     const deleteProd = await ProductModel.findByIdAndDelete(id);

//     if (!deleteProd) throw new NotFoundError(`No product found with id: ${id}`);

//     return deleteProd;
//   };
// }
