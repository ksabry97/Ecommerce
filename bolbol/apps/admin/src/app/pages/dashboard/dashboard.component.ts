/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getRequest();
  }

  getRequest() {
    this.http
      .get(
        'https://gateway.marvel.com:443/v1/public/series?apikey=7d925b853f2adebfec8471dde35c0366'
      )
      .subscribe((obj) => {
        console.log(obj);
      });
  }
}
