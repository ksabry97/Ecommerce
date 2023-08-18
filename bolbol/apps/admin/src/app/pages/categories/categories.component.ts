import { Category } from 'libs/models/category';
import { CategoriesService } from './../../../../../../libs/products/src/lib/services/categories.service';
import { Component } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent {
  categories: Category[] = [];
  constructor(
    private categoryService: CategoriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}
  // getting categories from database:
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.udpdateUi;
  }

  // delteing a Category :
  delete(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoryService.deleteCategory(categoryId).subscribe(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'category deleted',
          });
          this.udpdateUi;
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
  // re-directing to the edit mode :

  edit(categoryId: string) {
    this.router.navigateByUrl(`categories/form/${categoryId}`);
  }

  // updating ui

  get udpdateUi() {
    return this.categoryService.getCategories().subscribe((cat) => {
      this.categories = cat;
    });
  }
}
