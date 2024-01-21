import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, Observable } from 'rxjs';

import { Articles } from '../models/articles';
import { HeroOperationError } from '../errors/hero-operation-error';
import IManageArticles from '../ports/i-manage-articles';

@Injectable({ providedIn: 'root' })
export class ArticleAdapterService implements IManageArticles {
  private fakeApiPostsUrl = 'https://jsonplaceholder.typicode.com/posts'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET articlees from the server */
  getArticles(): Observable<Articles[]> {
    return this.http
      .get<Articles[]>(this.fakeApiPostsUrl)
      .pipe(catchError(this.handleHttpError()));
  }

  /** GET article by id. Will 404 if id not found */
  getArticle(id: number): Observable<Articles> {
    const url = `${this.fakeApiPostsUrl}/${id}`;
    return this.http
      .get<Articles>(url)
      .pipe(catchError(this.handleHttpError()));
  }

  /* GET article whose name contains search term */
  searchArticles(term: string): Observable<Articles[]> {
    return this.http
      .get<Articles[]>(`${this.fakeApiPostsUrl}/?name=${term}`)
      .pipe(catchError(this.handleHttpError()));
  }

  //////// Save methods //////////

  /** POST: add a new article to the server */
  addArticle(article: Articles): Observable<Articles> {
    return this.http
      .post<Articles>(this.fakeApiPostsUrl, article, this.httpOptions)
      .pipe(catchError(this.handleHttpError()));
  }

  /** DELETE: delete the article from the server */
  deleteArticle(id: number): Observable<number> {
    const url = `${this.fakeApiPostsUrl}/${id}`;
    return this.http.delete<Articles>(url, this.httpOptions).pipe(
      catchError(this.handleHttpError()),
      // returns the deleted article id
      map((_) => id)
    );
  }

  /** PUT: update the article on the server */
  updateArticle(article: Articles): Observable<Articles> {
    const url = `${this.fakeApiPostsUrl}/${article.id}`;
    return this.http.put<Articles>(url, article, this.httpOptions).pipe(
      catchError(this.handleHttpError()),
      // returns the modified article
      map((_) => article)
    );
  }

  /**
   * Handle Http operation that failed.
   * Throw an articleOperation
   */
  private handleHttpError() {
    return (error: any): Observable<any> => {
      throw new HeroOperationError(error.body.error);
    };
  }
}
