/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@bolbol/products';
import { Product } from 'libs/models/product';
import { ProductsService } from 'libs/products/src/lib/services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: [],
})
export class ProductListComponent implements OnInit {
  catgeories: Category[] = [];
  products: Product[] = [];
  isCategory!: boolean;

  constructor(
    private catService: CategoriesService,
    private proService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      param['id'] ? this.getProducts([param['id']]) : this.getProducts();
      param['id'] ? this.isCategory == false : (this.isCategory = true);
    });

    this.updateUi();
  }

  //getting categories from data base :

  updateUi() {
    // getting categories
    this.catService.getCategories().subscribe((cat) => {
      this.catgeories = cat;
    });
  }

  //getting products
  getProducts(filteredCategories?: (string | undefined)[]) {
    this.proService.getProducts(filteredCategories).subscribe((pro) => {
      this.products = pro;
    });
  }

  //filtering by category :

  catgeoryFilter() {
    const selectedCategories = this.catgeories
      .filter((category) => category.checked)
      .map((cat) => cat.id);

    this.getProducts(selectedCategories);
  }
}
