import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import ErrorsHandler from './errors-handler';
import { User } from './models/user';
import IDisplayUserDetail from './ports/i-display-user-detail';
import IManageUsers from './ports/i-manage-users';
import IManageMessages from './ports/i-manage-messages';

@Injectable()
export default class UserDetailDisplayer implements IDisplayUserDetail {
  user: User | undefined = undefined;

  constructor(
    private _errorHandler: ErrorsHandler,
    @Inject('IManageUsers') private userManager: IManageUsers,
    @Inject('IManageMessages') private _messagesManager: IManageMessages
  ) {}

  askUserDetail(id: number): Observable<void> {
    return this.userManager.getUser(id).pipe(
      tap((_) => this._messagesManager.add(`fethed user id=${id}`)),
      catchError(this._errorHandler.handleError<User>(`getUser id=${id}`)),
      map((user) => {
        this.user = user;
      })
    );
  }

  askUserNameChange(newHeroName: string): Observable<void> {
    if (this.user === undefined) {
      return throwError(() => new Error('No user selected!'));
    }
    const updatedUser = { id: this.user.id, name: newHeroName };
    return this.userManager.updateUser(updatedUser).pipe(
      tap((_) =>
        this._messagesManager.add(
          `updated user id=${this.user ? this.user.id : 0}`
        )
      ),
      catchError(
        this._errorHandler.handleError<any>(
          `updateHero id=${this.user.id}`,
          this.user
        )
      ),
      map((user) => {
        if (this.user) {
          this.user.name = user.name;
        }
      })
    );
  }
}
