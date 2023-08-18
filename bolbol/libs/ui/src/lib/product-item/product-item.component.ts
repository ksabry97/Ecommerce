import { CartService } from './../../../../orders/src/lib/services/cart.service';
import { Product } from '../../../../models/product';
import { Component, Input } from '@angular/core';
import { CartItem } from 'libs/models/cart';

@Component({
  selector: 'ui-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  // add products to cart :

  addItemstoCart() {
    const item = new CartItem();
    item.productId = this.product.id;
    item.quantity = 1;

    this.cartService.addItems(item);
  }
}
