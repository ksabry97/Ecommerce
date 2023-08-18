import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [],
})
export class GalleryComponent {
  selectedImageUrl!: string;

  @Input()
  images!: string[];

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnChanges() {
    this.selectedImageUrl = this.images[0];
  }

  changeSelectedImage(index: number) {
    this.selectedImageUrl = this.images[index];
  }

  get hasImages() {
    return this.images?.length > 0;
  }
}
