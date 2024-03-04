export interface ProductInterface {
  make: string;
  model: number;
  price: number;
  description: string;
  sex: string;
  color: string;
  size: number;
  isAvailable: boolean;
}

export abstract class ProductRepo {
  abstract insert(product: ProductInterface): Promise<ProductInterface>;
  abstract fetch(id: string): Promise<ProductInterface> | null;
  abstract fetchAll(): Promise<ProductInterface[]>;
  abstract update(prod: ProductInterface): Promise<ProductInterface>;
  abstract delete(id: string): Promise<ProductInterface>;
}
