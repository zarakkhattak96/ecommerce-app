import { NotFoundError } from '../../../app/app.errors';
import {
  ProductInterface,
  ProductRepo,
} from '../../../domain/interfaces/product/product.interface';
import ProductModel from '../models/product/product.model';

export class ProductRepository implements ProductRepo {
  // insert Product

  insert = async (prod: ProductInterface) => {
    const newProduct = await ProductModel.create(prod);
    return newProduct;
  };

  fetch = async (id: string) => {
    const fetchById = await ProductModel.findById(id);

    if (fetchById === null)
      throw new NotFoundError(`No product found with id ${id}`);

    return fetchById;
  };

  fetchAll = async () => {
    const fetchAll = await ProductModel.find();

    return fetchAll;
  };

  update = async (prod: ProductInterface) => {
    const updateProduct = await ProductModel.findOneAndUpdate(prod);

    if (updateProduct === null)
      throw new NotFoundError('No product available to update');

    return updateProduct;
  };

  delete = async (id: string) => {
    const deleteProd = await ProductModel.findByIdAndDelete(id);

    if (deleteProd === null)
      throw new NotFoundError(`No product found with id: ${id}`);

    return deleteProd;
  };
}
