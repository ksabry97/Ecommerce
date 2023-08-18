import { AuthGuard } from './../../../../libs/users/src/lib/services/auth-guard.service';
import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UsersComponent } from './pages/users/users.component';
import { CategoryFormComponent } from './pages/category-form/category-form.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { OrderDetailComponent } from './pages/order-detail/order-detail.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'categories',
        component: CategoriesComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'categories/form',
        component: CategoryFormComponent,
      },
      {
        path: 'categories/form/:id',
        component: CategoryFormComponent,
      },
      {
        path: 'products/form',
        component: ProductFormComponent,
      },
      {
        path: 'products/form/:id',
        component: ProductFormComponent,
      },
      {
        path: 'users/form',
        component: UserFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent,
      },
      {
        path: 'orders/:id',
        component: OrderDetailComponent,
      },
    ],
  },
];
