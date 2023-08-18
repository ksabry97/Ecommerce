/* eslint-disable @typescript-eslint/no-unused-vars */
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'libs/models/category';
import { CategoriesService } from 'libs/products/src/lib/services/categories.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-category-form',
  templateUrl: './category-form.component.html',
  styles: [],
})
export class CategoryFormComponent {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  category: Category = {};
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  categoryId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoriesService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  // binding data from the form :
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: [''],
    });
    this.checkEdit();
  }
  //adding data to database :
  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid) return;
    this.category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value,
    };
    // checking if we are in the edit-mode :
    if (this.editMode) {
      this.updateCategory();
    } else {
      this.addCategory();
    }
  }

  // checking if we are in the edit-mode or not :
  checkEdit() {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.editMode = true;
        this.categoryId = param['id'];
        this.categoryService.getCategory(param['id']).subscribe((cat) => {
          this.form.controls['name'].setValue(cat.name);
          this.form.controls['icon'].setValue(cat.icon);
          this.form.controls['color'].setValue(cat.color);
        });
      }
    });
  }

  // adding a new category to the database :

  addCategory() {
    this.categoryService.addCategory(this.category).subscribe(
      (category: Category) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${category.name} Category is created ! `,
        });
        setTimeout(() => {
          setTimeout(() => {
            this.location.back();
          }, 2000);
        });
      },

      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'category is not added',
        });
      }
    );
  }
  // updating an existing category in the database:
  updateCategory() {
    this.categoryService
      .updateCategory(this.categoryId, this.category)
      .subscribe(
        (category: Category) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `${category.name} Category is Updated ! `,
          });
          setTimeout(() => {
            setTimeout(() => {
              this.location.back();
            }, 2000);
          });
        },

        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'category is not updated',
          });
        }
      );
  }
  // cancelling
  onCancel() {
    setTimeout(() => {
      setTimeout(() => {
        this.location.back();
      }, 1000);
    });
  }
}
