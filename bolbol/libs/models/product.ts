import { Category } from './category';

export class Product {
  id: string = '';
  name: string = '';
  image: string = '';
  brand: string = '';
  price: number = 0;
  rating: number = 0;
  quantity: number = 0;
  images!: string[];
  countInStock: number = 2;
  description: string = '';
  richDescription: string = '';
  isFeatured?: boolean;
  category: Category = {};
  dateCreated?: Date;
}
