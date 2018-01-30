import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
// export default class ActivateGuard implements CanActivate
@Injectable()
export class ActivateGuard implements CanActivate {
  private can: boolean = false;

  constructor(private router: Router) {
    if (localStorage.getItem("id") != null && localStorage.getItem("token") != null) {
      this.setCanActivate(true);
    }
  }

  canActivate() {
    //console.log("path name", location.pathname);
    //console.log('ActivateGuard#canActivate called, can: ', this.can);
    if (!this.can) {
      if (location.pathname != "/login") {
         //localStorage.setItem("previousPath", location.hash.replace('#/', '/'));
        localStorage.setItem("previousPath", location.pathname);
      }
      this.router.navigate(['/login']);
      // this.router.navigate(['/']);
      // alert('Activation blocked already loggedin');
      return false;
    }

    return true;
  }

  setCanActivate(can: any) {
    this.can = can;
  }
}