import { Component, Inject, inject, OnInit } from '@angular/core';
import IManageAuthentication from '../domain/ports/i-manage-authentication';
import { Store } from '@ngrx/store';
import { user } from '../store/selectors/user.selector';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    @Inject('IManageAuthentication')
    public manageAuthentication: IManageAuthentication
  ) {}

  #router = inject(Router);

  store = inject(Store);
  isAuthenticated = false;

  ngOnInit(): void {
    this.store
      .select(user)
      .subscribe(
        (state) => (this.isAuthenticated = state.user.isAuthenticated)
      );
  }

  isCurrentPage(url: string): boolean {
    return this.#router.url === url;
  }

  title = 'hexagonal_blog';
}
