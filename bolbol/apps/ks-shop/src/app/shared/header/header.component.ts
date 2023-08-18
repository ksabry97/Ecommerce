import { CartService } from './../../../../../../libs/orders/src/lib/services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ks-shop-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(private cartSer: CartService) {}

  ngOnInit(): void {
    this.cartSer.intialCart();
  }
}
