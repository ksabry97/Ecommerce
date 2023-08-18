import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'libs/models/cart';
import { Product } from 'libs/models/product';
import { CartService } from 'libs/orders/src/lib/services/cart.service';
import { ProductsService } from 'libs/products/src/lib/services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styles: [],
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  quantity!: number;

  constructor(
    private route: ActivatedRoute,
    private proService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      this.getProduct(param['id']);
    });
  }
  addItemstoCart() {
    const item = new CartItem();
    item.productId = this.product.id;
    item.quantity = this.quantity;

    this.cartService.addItems(item);
  }
  // getting a product by id :

  getProduct(id: string) {
    this.proService.getproduct(id).subscribe((pro) => {
      this.product = pro;
    });
  }
}
