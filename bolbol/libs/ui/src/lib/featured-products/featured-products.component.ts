import { ProductsService } from 'libs/products/src/lib/services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'libs/models/product';

@Component({
  selector: 'ui-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [],
})
export class FeaturedProductsComponent implements OnInit {
  featuredProducts: Product[] = [];

  constructor(private service: ProductsService) {}

  ngOnInit(): void {
    this.updateUi();
  }

  // getting featured products :

  updateUi() {
    this.service.getFeaturedProducts(4).subscribe((products) => {
      this.featuredProducts = products;
    });
  }
}
