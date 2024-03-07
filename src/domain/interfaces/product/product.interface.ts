export interface ProductInterface {
  id?: number;
  make: string | null;
  model: number | null;
  price: number | null;
  description: string | null;
  sex: string | null;
  color: string | null;
  size: number | null;
  isAvailable: boolean | null;
}

export abstract class ProductBaseRepo {
  abstract insert(product: ProductInterface): Promise<ProductInterface>;
  abstract fetch(id: number): Promise<ProductInterface> | null;
  abstract fetchAll(): Promise<ProductInterface[]>;
  abstract update(prod: ProductInterface): Promise<ProductInterface>;
  abstract delete(id: number): Promise<ProductInterface>;
}
