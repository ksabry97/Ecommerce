import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ordersRoutes } from './lib.routes';
import { CartIconComponent } from './cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ButtonModule } from 'primeng/button';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { ThankYouComponent } from './thank-you/thank-you.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ordersRoutes),
    RouterModule,
    BadgeModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputMaskModule,
    InputNumberModule,
  ],
  declarations: [
    CartIconComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
  exports: [
    CartIconComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],
})
export class OrdersModule {}
