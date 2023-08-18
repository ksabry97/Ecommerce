import { Router } from '@angular/router';
import { User } from '../../../../models/user';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const TOKEN = 'jwtToken';
const API = 'https://ks-shop-api.vercel.app/';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  // getting users from database:
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${API}users`);
  }

  //deleting user from data base :
  deleteUser(userId: string): Observable<object> {
    return this.http.delete<object>(`${API}users/${userId}`);
  }

  //updating user from data base :
  updateUser(userId: string, user: User): Observable<object> {
    return this.http.put<object>(`${API}users/${userId}`, user);
  }
  // gettin a User By ID from database:
  getUser(userId: string | undefined): Observable<User> {
    return this.http.get<User>(`${API}users/${userId}`);
  }

  // posting a user to the database :
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${API}users`, user);
  }

  // login Authincuation :
  login(
    email: string,
    password: string
  ): Observable<{ user: string; token: string }> {
    return this.http.post<{ user: string; token: string }>(
      `${API}users/login`,
      {
        email,
        password,
      }
    );
  }

  // logout :

  logout() {
    this.deleteToken();
    this.router.navigateByUrl('/login');
  }

  // managing Local Storage :

  // setting token in the local storage :

  setToken(data: string) {
    return localStorage.setItem(TOKEN, data);
  }

  // getting token form local storage :

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  //deleting token :

  deleteToken() {
    localStorage.removeItem(TOKEN);
  }
}
