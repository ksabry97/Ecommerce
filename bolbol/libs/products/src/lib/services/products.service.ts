import { Product } from '../../../../models/product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'https://ks-shop-api.vercel.app/';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  // getting products from database:
  getProducts(
    filteredCategories?: (string | undefined)[]
  ): Observable<Product[]> {
    let param = new HttpParams();

    if (filteredCategories) {
      param = param.append('categories', filteredCategories.join(','));
    }

    return this.http.get<Product[]>(`${API}products`, {
      params: param,
    });
  }

  // posting aproduct to data base :

  addProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(`${API}products`, product);
  }
  // getting ap roduct by id :
  getproduct(productId: string | undefined): Observable<Product> {
    return this.http.get<Product>(`${API}products/${productId}`);
  }
  //updating a product :
  updateProduct(productId: string, product: FormData): Observable<Product> {
    return this.http.put<Product>(`${API}products/${productId}`, product);
  }

  // deleting a Product :

  deleteProduct(productId: string): Observable<object> {
    return this.http.delete(`${API}products/${productId}`);
  }

  //getting featured products :

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${API}products/get/featured/${count}`);
  }
}
