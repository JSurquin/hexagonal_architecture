import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, Observable } from 'rxjs';

import { User } from '../models/user';
import { HeroOperationError } from '../errors/hero-operation-error';
import IManageUsers from '../ports/i-manage-users';

@Injectable({ providedIn: 'root' })
export class UserAdapterService implements IManageUsers {
  private heroesUrl = 'https://jsonplaceholder.typicode.com/users'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET heroes from the server */
  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.heroesUrl)
      .pipe(catchError(this.handleHttpError()));
  }

  /** GET hero by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<User>(url).pipe(catchError(this.handleHttpError()));
  }

  /* GET heroes whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(catchError(this.handleHttpError()));
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addUser(hero: User): Observable<User> {
    return this.http
      .post<User>(this.heroesUrl, hero, this.httpOptions)
      .pipe(catchError(this.handleHttpError()));
  }

  /** DELETE: delete the hero from the server */
  deleteUser(id: number): Observable<number> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<User>(url, this.httpOptions).pipe(
      catchError(this.handleHttpError()),
      // returns the deleted hero id
      map((_) => id)
    );
  }

  /** PUT: update the hero on the server */
  updateUser(hero: User): Observable<User> {
    return this.http.put<User>(this.heroesUrl, hero, this.httpOptions).pipe(
      catchError(this.handleHttpError()),
      // returns the modified hero
      map((_) => hero)
    );
  }

  /**
   * Handle Http operation that failed.
   * Throw an HeroOperation
   */
  private handleHttpError() {
    return (error: any): Observable<any> => {
      throw new HeroOperationError(error.body.error);
    };
  }
}
