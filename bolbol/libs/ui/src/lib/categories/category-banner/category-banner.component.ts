import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@bolbol/products';

@Component({
  selector: 'ui-category-banner',
  templateUrl: './category-banner.component.html',
  styles: [],
})
export class CategoryBannerComponent implements OnInit {
  cateogries: Category[] = [];

  constructor(private service: CategoriesService) {}

  ngOnInit(): void {
    this.updateUi();
  }

  updateUi() {
    this.service.getCategories().subscribe((cat) => {
      this.cateogries = cat;
    });
  }
}
