import { Product } from './product';

export class CartItem {
  productId: string = '';
  quantity: number = 0;
}

export class CartItemDetail {
  product: Product = new Product();
  quantity: number = 0;
}

export class Cart {
  items: CartItem[] = [];
}
