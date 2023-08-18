import { Component, Input, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../services/cart.service';

import { Router } from '@angular/router';
import { OrdersService } from '../services/orders.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styles: [],
})
export class OrderSummaryComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  endSubs$: Subject<any> = new Subject();
  totalPrice!: number;
  @Input() isCart!: boolean;

  constructor(
    private cartService: CartService,
    private orderService: OrdersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getOrderSummary();
  }

  _getOrderSummary() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((cart) => {
      this.totalPrice = 0;
      if (cart) {
        cart.items.map((item) => {
          this.orderService
            .getproduct(item.productId)
            .pipe(take(1))
            .subscribe((product) => {
              this.totalPrice += product.price * item.quantity;
            });
        });
      }
    });
  }

  // checkout :

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
