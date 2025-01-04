

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {AuthService} from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}
//
//   canActivate(): boolean {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     }
//     this.router.navigate(['/login']);
//     return false;
//   }
// }
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   if (!this.authService.isAuthenticated()) {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //
  //   const userRole = this.authService.getRole();
  //   const allowedRoles = route.data['roles'] as Array<string>;
  //
  //   if (allowedRoles && !allowedRoles.includes(<string>userRole)) {
  //     this.router.navigate(['/not-authorized']);
  //     return false;
  //   }
  //
  //   return true;
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // First check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRole = this.authService.getRole();
    const allowedRoles = route.data['roles'] as Array<string>;

    // Debug logging
    console.log('User Role:', userRole);
    console.log('Allowed Roles:', allowedRoles);

    // If route has roles defined, check if user has permission
    if (allowedRoles && allowedRoles.length > 0) {
      if (!allowedRoles.includes(<string>userRole)) {
        console.log('Access denied: User role not in allowed roles');
        this.router.navigate(['/not-authorized']);
        return false;
      }
    }

    // If no roles specified or user has correct role, allow access
    console.log('Access granted');
    return true;
  }
}
