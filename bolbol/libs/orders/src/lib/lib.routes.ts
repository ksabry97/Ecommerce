import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { Route } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

export const ordersRoutes: Route[] = [
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'thank-you',
    component: ThankYouComponent,
  },
];
