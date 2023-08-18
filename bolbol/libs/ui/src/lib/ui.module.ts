import { ProductDetailComponent } from './../../../../apps/ks-shop/src/app/pages/product-detail/product-detail.component';
import { ProductListComponent } from './../../../../apps/ks-shop/src/app/pages/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { CategoryBannerComponent } from './categories/category-banner/category-banner.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MessagesModule } from 'primeng/messages';

const uiRoutes: Routes = [
  {
    path: 'category/:id',
    component: ProductListComponent,
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    HttpClientModule,
    RouterModule.forChild(uiRoutes),
    MessagesModule,
  ],
  declarations: [
    BannerComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    GalleryComponent,
  ],
  exports: [
    BannerComponent,
    CategoryBannerComponent,
    ProductItemComponent,
    FeaturedProductsComponent,
    GalleryComponent,
  ],
})
export class UiModule {}
