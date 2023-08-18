import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Product } from './../../../../../../libs/models/product';
import { CategoriesService } from './../../../../../../libs/products/src/lib/services/categories.service';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '@bolbol/products';
import { ProductsService } from 'libs/products/src/lib/services/products.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-product-form',
  templateUrl: './product-form.component.html',
  styles: [],
})
export class ProductFormComponent {
  editMode = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form!: FormGroup | any;
  isSubmitted = false;
  categories: Category[] = [];
  imageDisplay: string | undefined | ArrayBuffer | null;
  productId!: string;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private productService: ProductsService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      brand: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],
    });
    this.checkEdit();
    this.getCategories();
  }
  // submitting Form :
  onSubmit() {
    this.isSubmitted = true;
    if (!this.form.valid) return;

    const productFormdata = new FormData();
    Object.keys(this.form.controls).map((key) => {
      productFormdata.append(key, this.form.controls[key].value);
    });

    if (this.editMode) {
      this.updateProduct(productFormdata);
    } else {
      this.addProduct(productFormdata);
    }
    console.log(productFormdata);
  }
  // uploading an image :

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpload(event: { target: any }) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      const fileReader = new FileReader();

      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }
  // adding a new product to the database :

  addProduct(product: FormData) {
    this.productService.addProduct(product).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${product.name} Product is created ! `,
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
          detail: 'product is not added',
        });
      }
    );
  }
  // getting categories for the dropdown :
  getCategories() {
    this.categoriesService.getCategories().subscribe((cat) => {
      this.categories = cat;
    });
  }
  // checking the edit mode :
  checkEdit() {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.editMode = true;
        this.productId = param['id'];
        this.productService.getproduct(this.productId).subscribe((pro) => {
          this.form.controls.name.setValue(pro.name);
          this.form.controls.brand.setValue(pro.brand);
          this.form.controls.price.setValue(pro.price);
          this.form.controls.countInStock.setValue(pro.countInStock);
          this.form.controls.category.setValue(pro.category?.id);
          this.form.controls.isFeatured.setValue(pro.isFeatured);
          this.form.controls.description.setValue(pro.description);
          this.form.controls.richDescription.setValue(pro.richDescription);
          this.imageDisplay = pro.image;
          this.form.controls.image.setValidators([]);
          this.form.controls.image.updateValueAndValidity();
        });
      }
    });
  }

  // updating product :
  updateProduct(productForm: FormData) {
    this.productService.updateProduct(this.productId, productForm).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${product.name} Product is Updated ! `,
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
          detail: 'Product is not updated',
        });
      }
    );
  }
  onCancel() {
    setTimeout(() => {
      setTimeout(() => {
        this.location.back();
      }, 1000);
    });
  }
}
