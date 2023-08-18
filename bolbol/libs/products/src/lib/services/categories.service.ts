import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../../../models/category';

const API = 'https://ks-shop-api.vercel.app/';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  // getting categories from database:
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API}cateogries`);
  }

  // gettin a Category By ID from database:
  getCategory(categoryId: string | undefined): Observable<Category> {
    return this.http.get<Category>(`${API}cateogries/${categoryId}`);
  }

  // posting a category to the database :
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${API}cateogries`, category);
  }

  // deleting a Category from database :

  deleteCategory(categoryId: string): Observable<object> {
    return this.http.delete(`${API}cateogries/${categoryId}`);
  }

  // updating a category:
  updateCategory(categoryId: string, category: Category): Observable<object> {
    return this.http.put(`${API}cateogries/${categoryId}`, category);
  }
}
