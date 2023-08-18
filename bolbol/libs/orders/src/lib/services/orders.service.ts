import { Order } from '../../../../models/order';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'libs/orders/models/product';

const API = 'https://ks-shop-api.vercel.app/';
@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}
  // getting orders from database:
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${API}orders`);
  }

  // gettin a Order By ID from database:
  getOrder(orderId: string | undefined): Observable<Order> {
    return this.http.get<Order>(`${API}orders/${orderId}`);
  }

  // posting a order to the database :
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${API}orders`, order);
  }

  // deleting a Order from database :

  deleteOrder(orderId: string): Observable<object> {
    return this.http.delete(`${API}orders/${orderId}`);
  }

  // updating a order:
  updateOrder(orderId: string, order: Order): Observable<object> {
    return this.http.put(`${API}orders/${orderId}`, order);
  }

  // getting ap roduct by id :
  getproduct(productId: string | undefined): Observable<Product> {
    return this.http.get<Product>(`${API}products/${productId}`);
  }
}
