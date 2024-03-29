export interface CartInterface {
  id?: number;
  price: number | null;
  quantity: number | null;
  shippingFee: number | null;
  total: number | null;
  description: string | null;
  productId?: number | null;
  userId?: number | null;
  productName: string | null;
}

export interface CartBaseInterface {
  addToCart(cart: CartInterface): Promise<CartInterface>;
  fetchAllFromCart(): Promise<CartInterface[]>;
  fetchOneFromCart(id: number): Promise<CartInterface> | null;
  deleteFromCart(id: number): Promise<CartInterface>;
  updateInCart(
    prodInCartId: number,
    cart: CartInterface,
  ): Promise<CartInterface>;
}
