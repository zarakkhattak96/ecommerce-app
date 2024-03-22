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

export interface ProductBaseRepoInterface {
  insert(product: ProductInterface): Promise<ProductInterface>;
  fetch(id: number | undefined): Promise<ProductInterface> | null;
  fetchAll(): Promise<ProductInterface[]>;
  update(userId: number, prod: ProductInterface): Promise<ProductInterface>;
  delete(id: number): Promise<ProductInterface>;
}
