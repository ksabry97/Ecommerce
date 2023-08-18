import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'libs/models/user';
import { UsersService } from 'libs/users/src/lib/services/users.service';
import { MessageService } from 'primeng/api';
import * as countriesList from 'i18n-iso-countries';
declare const require: (arg0: string) => countriesList.LocaleData;
@Component({
  selector: 'admin-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
})
export class UserFormComponent {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  user: User = {};
  userId = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  countries: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  // binding data from the form :
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.getCountries();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [false],
      street: ['', Validators.required],
      apartment: ['', Validators.required],
      zipCode: ['', Validators.required],
      city: [''],
      country: [''],
    });
    this.checkEdit();
  }
  //adding data to database :
  onSubmit() {
    console.log('hbbe');
    this.isSubmitted = true;
    if (!this.form.valid) return;
    this.user = {
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      phone: this.form.controls['phone'].value,
      isAdmin: this.form.controls['isAdmin'].value,
      street: this.form.controls['street'].value,
      apartment: this.form.controls['apartment'].value,
      zipCode: this.form.controls['zipCode'].value,
      city: this.form.controls['city'].value,
      country: this.form.controls['country'].value,
    };
    // checking if we are in the edit-mode :
    if (this.editMode) {
      this.updateUser();
    } else {
      this.addUser();
    }
  }

  // checking if we are in the edit-mode or not :
  checkEdit() {
    this.route.params.subscribe((param) => {
      if (param['id']) {
        this.editMode = true;
        this.userId = param['id'];
        this.userService.getUser(param['id']).subscribe((user) => {
          this.form.controls['name'].setValue(user.name);
          this.form.controls['email'].setValue(user.email);
          this.form.controls['password'].setValue(user.password);
          this.form.controls['phone'].setValue(user.phone);
          this.form.controls['isAdmin'].setValue(user.isAdmin);
          this.form.controls['street'].setValue(user.street);
          this.form.controls['city'].setValue(user.city);
          this.form.controls['country'].setValue(user.country);
          this.form.controls['zipCode'].setValue(user.zipCode);
          this.form.controls['apartment'].setValue(user.apartment);
        });
      }
    });
  }

  // adding a newuser to the database :

  addUser() {
    this.userService.addUser(this.user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${user.name} User is created ! `,
        });
        setTimeout(() => {
          setTimeout(() => {
            this.location.back();
          }, 2000);
        });
      },

      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not added',
        });
      }
    );
  }
  // updating an existinguser in the database:
  updateUser() {
    this.userService.updateUser(this.userId, this.user).subscribe(
      (user: User) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `${user.name} User is Updated ! `,
        });
        setTimeout(() => {
          setTimeout(() => {
            this.location.back();
          }, 2000);
        });
      },

      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User is not updated',
        });
      }
    );
  }
  // cancelling
  onCancel() {
    setTimeout(() => {
      setTimeout(() => {
        this.location.back();
      }, 1000);
    });
  }

  // getting countries for the dropdoown :
  getCountries() {
    countriesList.registerLocale(require('i18n-iso-countries/langs/en.json'));
    this.countries = Object.entries(
      countriesList.getNames('en', { select: 'official' })
    ).map((entry) => {
      console.log(entry);
      return {
        id: entry[0],
        name: entry[1],
      };
    });
  }
}
