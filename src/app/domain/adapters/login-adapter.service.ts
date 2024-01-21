import { Injectable, inject } from '@angular/core';
import IManageAuthentication from '../ports/i-manage-authentication';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginAdapterService implements IManageAuthentication {
  isLoggedIn: boolean = false;

  route = inject(ActivatedRoute);

  login(): Observable<any> {
    console.log('login');
    return new Observable((observer) => {
      observer.next('login');
      observer.complete();
    });
  }

  checkLogin(): boolean {
    return this.isLoggedIn;
  }

  logout() {
    console.log('logout');
  }

  register() {
    console.log('register');
  }
}
