import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { orderItem } from 'libs/orders/models/orderItem';
import { CartService } from '../services/cart.service';
import { Cart } from 'libs/orders/models/cart';
import { OrdersService } from '../services/orders.service';
import { Order } from 'libs/orders/models/order';

@Component({
  selector: 'orders-checkout-page',
  templateUrl: './checkout-page.component.html',
  styles: [],
})
export class CheckoutPageComponent implements OnInit {
  constructor(
    private router: Router,
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private orderService: OrdersService
  ) {}
  checkoutFormGroup!: FormGroup;
  isSubmitted = false;
  orderItems: orderItem[] = [];
  userId = '64d549a25bb57f263b96612a';
  countries = [];

  ngOnInit(): void {
    this._initCheckoutForm();
    this.getOrders();
  }

  private _initCheckoutForm() {
    this.checkoutFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      apartment: ['', Validators.required],
      street: ['', Validators.required],
    });
  }

  backToCart() {
    this.router.navigate(['/cart']);
  }

  // getting orderitems
  getOrders() {
    const cart: Cart = this.cartService.getcart();

    this.orderItems = cart.items.map((item) => {
      return {
        product: item.productId,
        quantity: item.quantity,
      };
    });
  }

  placeOrder() {
    this.isSubmitted = true;
    if (this.checkoutFormGroup.invalid) {
      console.log('hbbe');
      return;
    }
    const order: Order = {
      name: this.checkoutForm['name'].value,
      email: this.checkoutForm['email'].value,
      user: this.userId,
      orderItems: this.orderItems,
      shippingAddress1: this.checkoutForm['street'].value,
      shippingAddress2: this.checkoutForm['apartment'].value,
      city: this.checkoutForm['city'].value,
      phone: this.checkoutForm['phone'].value,
      status: 0,
      dateOrdered: `${Date.now()}`,
    };

    this.orderService.addOrder(order).subscribe(() => {
      this.cartService.emptyCart();
      this.router.navigate(['/thank-you']);
    });
  }

  get checkoutForm() {
    return this.checkoutFormGroup.controls;
  }
}
