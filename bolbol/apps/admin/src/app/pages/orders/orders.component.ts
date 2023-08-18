/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { OrdersService } from './../../../../../../libs/orders/src/lib/services/orders.service';
import { Order } from './../../../../../../libs/models/order';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
const ORDER_STATUS = [
  {
    label: 'pending..',
    color: 'primary',
  },
  {
    label: 'shipped',
    color: 'success',
  },
  {
    label: 'delivered',
    color: 'info',
  },
  {
    label: 'failed',
    color: 'danger',
  },
  {
    label: '',
    color: '',
  },
];
@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS;
  constructor(private ordersService: OrdersService, private router: Router) {}

  ngOnInit(): void {
    this.getOrders();
  }
  // getting orders from data base
  getOrders() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }
  //deleting an order
  deleteOrder(id: string) {
    this.ordersService.deleteOrder(id).subscribe(() => {
      return this.ngOnInit();
    });
  }
  //navigating to order detail
  showOrder(orderId: string) {
    this.router.navigateByUrl(`orders/${orderId}`);
  }
}
