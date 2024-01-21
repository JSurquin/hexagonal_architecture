import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import ErrorsHandler from './errors-handler';
import { User } from './models/user';
import IManageUsers from './ports/i-manage-users';
import IManageMessages from './ports/i-manage-messages';
import IDisplayUsers from './ports/i-display-users';

@Injectable()
export default class UsersDisplayer implements IDisplayUsers {
  users: User[] = [];
  filter: string = '';

  constructor(
    private _errorHandler: ErrorsHandler,
    @Inject('IManageUsers') private _usersManager: IManageUsers,
    @Inject('IManageMessages') private _messagesManager: IManageMessages
  ) {}

  askUsersList(): Observable<void> {
    if (this.filter) {
      return this.askUsersFiltered(this.filter);
    }
    return this._usersManager.getUsers().pipe(
      tap((_) => this._messagesManager.add('fetched users')),
      catchError(this._errorHandler.handleError<User[]>('getHeroes', [])),
      map((users) => {
        this.users = users;
      })
    );
  }

  askUsersFiltered(
    filter: string,
    allowEmpty: boolean = false
  ): Observable<void> {
    if (!allowEmpty && !filter.trim()) {
      // if not filter string, return empty user array.
      this.users = [];
      // avoid unexpected behaviours encountered using of()
      return of(null).pipe(map((_) => {}));
    }
    // in case allowEmpty is true, empty filter return all users
    return this._usersManager.searchUsers(filter).pipe(
      tap((users: User[]) =>
        users.length
          ? this._messagesManager.add(`found users matching "${filter}"`)
          : this._messagesManager.add(`no users matching "${filter}"`)
      ),
      catchError(this._errorHandler.handleError<User[]>('searchHeroes', [])),
      map((users) => {
        this.users = users;
        this.filter = filter;
      })
    );
  }

  askUserCreation(heroName: string): Observable<void> {
    heroName = heroName.trim();
    return this._usersManager.addUser({ name: heroName } as User).pipe(
      tap((newHero: User) =>
        this._messagesManager.add(`added user w/ id=${newHero.id}`)
      ),
      catchError(this._errorHandler.handleError<User>('addHero')),
      map((user) => {
        if (user === undefined) {
          return;
        }
        if (heroName.indexOf(this.filter) !== -1) {
          this.users.push(user);
        }
      })
    );
  }

  askUserDeletion(user: User): Observable<void> {
    return this._usersManager.deleteUser(user.id).pipe(
      tap((_) => this._messagesManager.add(`deleted user id=${user.id}`)),
      catchError(
        this._errorHandler.handleError<User>('deleteUser', { id: -1 } as User)
      ),
      map((deletedHeroId) => {
        this.users = this.users.filter((h) => h.id !== deletedHeroId);
      })
    );
  }
}
