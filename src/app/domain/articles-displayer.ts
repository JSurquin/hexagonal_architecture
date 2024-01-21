import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import ErrorsHandler from './errors-handler';
import { Articles } from './models/articles';
import IDisplayArticles from './ports/i-display-articles';
import IManageArticles from './ports/i-manage-articles';
import IManageMessages from './ports/i-manage-messages';

@Injectable()
export default class ArticlesDisplayer implements IDisplayArticles {
  Articles: Articles[] = [];
  filter: string = '';

  constructor(
    private _errorHandler: ErrorsHandler,
    @Inject('IManageArticles') private _articlesManager: IManageArticles,
    @Inject('IManageMessages') private _messagesManager: IManageMessages
  ) {}

  askArticles(): Observable<void> {
    return this._articlesManager.getArticles().pipe(
      tap((_) => this._messagesManager.add('fetched articles')),
      catchError(this._errorHandler.handleError<Articles[]>('getArticles', [])),
      map((articles) => {
        this.Articles = articles;
      })
    );
  }
}
