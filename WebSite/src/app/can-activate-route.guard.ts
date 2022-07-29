import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

    constructor(
      private auth: AuthService,
      private router: Router,
    ) {}

  canActivate(): boolean {
    if (!this.auth.isLogged() && this.router.url === '/')
      this.router.navigate(['login']);
    return this.auth.isLogged();
  }
}

@Injectable()
export class CanActivateRouteGuardAdmin implements CanActivate {

  constructor(
    private userService: UserService
  ) {}

  canActivate(): boolean {
    var isAdmin: boolean = false;

    this.userService.isAdmin().subscribe({
      next: (data) => {
        isAdmin = data.role === 'admin' ? true : false;
      }
    });
    return isAdmin
  }
}