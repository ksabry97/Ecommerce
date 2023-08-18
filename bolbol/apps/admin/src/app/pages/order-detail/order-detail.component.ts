/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'libs/models/order';
import { OrdersService } from 'libs/orders/src/lib/services/orders.service';
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
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styles: [],
})
export class OrderDetailComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: Order | any;
  orderStatus = ORDER_STATUS;
  selectedStatus!: string;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService
  ) {}
  ngOnInit(): void {
    this.getOrder();
  }

  // getting orderDetails:
  getOrder() {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.orderService.getOrder(param['id']).subscribe((order) => {
          this.order = order;
          this.selectedStatus = this.orderStatus[order.status].label;
        });
      }
    });
  }

  //updating order status :
  onStatus(event: { value: any }) {
    console.log(event);
  }
}
