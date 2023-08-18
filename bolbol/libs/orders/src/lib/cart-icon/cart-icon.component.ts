import { CartService } from './../services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [],
})
export class CartIconComponent implements OnInit {
  cartCount = '0';

  constructor(private cartServ: CartService) {}
  ngOnInit(): void {
    this.cartServ.cart$.subscribe((cart) => {
      this.cartCount = String(cart?.items?.length ?? 0);
    });
  }
}
