import { UsersService } from './../../../../../../libs/users/src/lib/services/users.service';
import { User } from './../../../../../../libs/models/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

@Component({
  selector: 'admin-users',
  templateUrl: './users.component.html',
})
export class UsersComponent {
  users: User[] = [];
  constructor(
    private usersService: UsersService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    //updating UI
    this.updateUi;
  }

  // getting users from data base :
  get updateUi() {
    return this.usersService.getUsers().subscribe((user) => {
      this.users = user;
    });
  }

  //deleting user :
  delete(userId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(() => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmed',
            detail: 'category deleted',
          });
          this.updateUi;
        });
      },
      reject: (type: unknown) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  // navigating to the edit form :
  edit(userId: string) {
    this.router.navigateByUrl(`users/form/${userId}`);
  }
}
