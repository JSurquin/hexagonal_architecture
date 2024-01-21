import { Component, Inject, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import IManageAuthentication from '@/app/domain/ports/i-manage-authentication';
import { LoginAdapterService } from '@/app/domain/adapters/login-adapter.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as usersActions from '@/app/store/actions/user.action';
export interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  // providers: [
  //   { provide: 'IManageAuthentication', useClass: LoginAdapterService },
  // ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  user: User = {
    email: '',
    password: '',
  };
  constructor(
    @Inject('IManageAuthentication')
    public manageAuthentication: IManageAuthentication
  ) {}

  public store = inject(Store);

  login(): void {
    // this.manageAuthentication.login();
    console.log('je passe ici');

    this.store.dispatch(usersActions.log());
    // this.authService.login();
    // console.log('this.authService.isLoggedIn', this.authService.isLoggedIn);
    // console.log(
    //   'this.manageAuthentication.isLoggedIn',
    //   this.manageAuthentication.isLoggedIn
    // );
  }
}
