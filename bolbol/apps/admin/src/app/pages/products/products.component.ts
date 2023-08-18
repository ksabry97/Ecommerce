import { CategoriesService } from 'libs/products/src/lib/services/categories.service';
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Product } from 'libs/models/product';
import { ProductsService } from './../../../../../../libs/products/src/lib/services/products.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmEventType,
  ConfirmationService,
  MessageService,
} from 'primeng/api';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  products: Product[] = [];
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private cateogryService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  ngOnInit() {
    //updating  UI
    this.updateUi;
  }

  //getting data from database:
  get updateUi() {
    return this.productsService.getProducts().subscribe((product) => {
      this.products = product;
    });
  }

  // navigating to another component :
  onClick(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

  // deleting a product:
  delete(productId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'Product deleted',
          });
          this.updateUi;
        });
      },
      reject: (type: unknown) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }
}
