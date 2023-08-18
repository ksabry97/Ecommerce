import { Component } from '@angular/core';
import { UsersService } from 'libs/users/src/lib/services/users.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private userService: UsersService) {}

  logOut() {
    this.userService.logout();
  }
}
