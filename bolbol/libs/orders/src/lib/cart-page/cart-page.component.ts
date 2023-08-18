import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetail } from 'libs/orders/models/cart';
import { CartService } from 'libs/orders/src/lib/services/cart.service';
import { ProductsService } from 'libs/products/src/lib/services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit {
  cartItems: CartItemDetail[] = [];

  constructor(
    private router: Router,
    private cartService: CartService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getorders();
  }

  // go back to products
  backHome() {
    this.router.navigate(['/products']);
  }

  // get orders :
  getorders() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = [];
      cart.items?.map((item) => {
        this.productService.getproduct(item.productId).subscribe((pro) => {
          this.cartItems.push({
            product: pro,
            quantity: item.quantity,
          });
        });
      });
    });
  }

  // delete items :
  deleteItem(item: CartItemDetail) {
    this.cartService.deleteItem(item.product.id);
  }

  // updating cart quantity :

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateCartQuantity(event: { value: any }, item: CartItemDetail) {
    this.cartService.addItems(
      {
        productId: item.product.id,
        quantity: event.value,
      },
      true
    );
  }
}
