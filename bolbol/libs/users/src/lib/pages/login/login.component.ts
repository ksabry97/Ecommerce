import { DashboardComponent } from './../../../../../../apps/admin/src/app/pages/dashboard/dashboard.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'user-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitted = false;
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {}
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.initForm();
  }

  //intializing the form:
  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  //getting form controls
  get logForm() {
    return this.loginForm.controls;
  }

  //submitting form
  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    this.userService
      .login(this.logForm['email'].value, this.logForm['password'].value)
      .subscribe(
        (user) => {
          this.userService.setToken(user.token);
          this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `${err.error}`,
          });
        }
      );
  }
}
