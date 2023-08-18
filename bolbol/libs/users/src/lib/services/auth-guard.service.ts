import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private userService: UsersService) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const Token = this.userService.getToken();
    if (Token) {
      const decoded = JSON.parse(atob(Token.split('.')[1]));
      console.log(decoded);
      if (decoded.admin) return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
