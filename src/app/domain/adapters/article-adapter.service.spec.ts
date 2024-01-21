import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Hero } from '../models/hero';
import { expect, beforeEach, describe } from '@jest/globals';

import { HeroAdapterService } from './user-adapter.service';
import { ArticleAdapterService } from './article-adapter.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('HeroAdapterService', () => {
  let service: ArticleAdapterService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ArticleAdapterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created service', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return expected articles', () => {
    const objet = { id: 1, title: 'test' };
    // httpClientSpy.get.and.returnValue(of(expectedHeroes));
    let articles: any = [];
    service.getArticles().subscribe((response) => {
      articles = response;
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );
    req.flush([objet]);
    expect(articles).toEqual([objet]);

    // service.getArticles().subscribe({
    //   next: (heroes) => {
    //     expect(heroes).toEqual(expectedHeroes);
    //     done();
    //   },
    //   error: done.fail,
    // });
    // expect(httpClientSpy.get).toHaveBeenCalledOnceWith('api/heroes');
  });

  it('he should be able to add an article', () => {
    const article = {
      id: '1',
      title: 'test',
      userId: '3',
      body: "contenu de l'article",
    };
    let articles: any = [];
    service.addArticle(article).subscribe((response) => {
      articles = response;
    });
    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );
    req.flush([article]);
    expect(articles).toEqual([article]);
  });

  it('should return an error getting articles when the server returns a 404', () => {
    const errorResponse = {
      body: { error: 'test 404 error' },
      status: 404,
      statusText: 'Not Found',
    };

    service.getArticles().subscribe({
      next: (_) => fail('expected an error, not articles'),
      error: (error) => {
        expect(error.name).toEqual('HeroOperationError');
        expect(error.message).toContain('test 404 error');
      },
    });

    const req = httpTestingController.expectOne(
      'https://jsonplaceholder.typicode.com/posts'
    );
    req.flush(errorResponse);
  });

  it('should update article', () => {
    const article = {
      id: '1',
      title: 'test',
      userId: '3',
      body: "contenu de l'article",
    };
    let articles: any = [];
    service.updateArticle(article).subscribe((response) => {
      articles = response;
    });
    const req = httpTestingController.expectOne(
      `https://jsonplaceholder.typicode.com/posts/${article.id}`
    );
    req.flush([article]);
    expect(articles).toEqual(article);
  });

  it('should delete article', () => {
    const article = {
      id: '1',
      title: 'test',
      userId: '3',
      body: "contenu de l'article",
    };
    let articles: any = [];
    service.deleteArticle(Number(article.id)).subscribe((response) => {
      articles = response;
    });
    const req = httpTestingController.expectOne(
      `https://jsonplaceholder.typicode.com/posts/${article.id}`
    );
    req.flush([article]);
    expect(articles).toEqual(1);
  });

  //   it('should return an error getting heroes when the server returns a 404', (done: DoneFn) => {
  //     const errorResponse = {
  //       body: { error: 'test 404 error' },
  //       status: 404,
  //       statusText: 'Not Found',
  //     };

  //     httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

  //     service.getHeroes().subscribe({
  //       next: (_) => done.fail('expected an error, not heroes'),
  //       error: (error) => {
  //         expect(error.name).toEqual('HeroOperationError');
  //         expect(error.message).toContain('test 404 error');
  //         done();
  //       },
  //     });
  //   });

  //   it('should return expected hero details', (done: DoneFn) => {
  //     const expectedHero: Hero = { id: 1, name: 'A' };

  //     httpClientSpy.get.and.returnValue(of(expectedHero));

  //     service.getHero(1).subscribe({
  //       next: (hero) => {
  //         expect(hero).toEqual(expectedHero);
  //         done();
  //       },
  //       error: done.fail,
  //     });
  //     expect(httpClientSpy.get).toHaveBeenCalledOnceWith('api/heroes/1');
  //   });

  //   it('should return an error getting hero details when the server returns a 404', (done: DoneFn) => {
  //     const errorResponse = {
  //       body: { error: 'test 404 error' },
  //       status: 404,
  //       statusText: 'Not Found',
  //     };

  //     httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

  //     service.getHero(1).subscribe({
  //       next: (_) => done.fail('expected an error, not hero details'),
  //       error: (error) => {
  //         expect(error.name).toEqual('HeroOperationError');
  //         expect(error.message).toContain('test 404 error');
  //         done();
  //       },
  //     });
  //   });

  //   it('should return searched heroes', (done: DoneFn) => {
  //     const expectedHeroes: Hero[] = [
  //       { id: 1, name: 'A' },
  //       { id: 2, name: 'AA' },
  //     ];

  //     httpClientSpy.get.and.returnValue(of(expectedHeroes));

  //     service.searchHeroes('A').subscribe({
  //       next: (heroes) => {
  //         expect(heroes).toEqual(expectedHeroes);
  //         done();
  //       },
  //       error: done.fail,
  //     });
  //     expect(httpClientSpy.get).toHaveBeenCalledOnceWith('api/heroes/?name=A');
  //   });

  //   it('should return an error searching heroes when the server returns a 404', (done: DoneFn) => {
  //     const errorResponse = {
  //       body: { error: 'test 404 error' },
  //       status: 404,
  //       statusText: 'Not Found',
  //     };

  //     httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

  //     service.searchHeroes('A').subscribe({
  //       next: (_) => done.fail('expected an error, not heroes'),
  //       error: (error) => {
  //         expect(error.name).toEqual('HeroOperationError');
  //         expect(error.message).toContain('test 404 error');
  //         done();
  //       },
  //     });
  //   });

  //   it('should post new hero creation', (done: DoneFn) => {
  //     const newHero: Hero = { id: 1, name: 'A' };

  //     httpClientSpy.post.and.returnValue(of(newHero));

  //     service.addHero(newHero).subscribe({
  //       next: (hero) => {
  //         expect(hero).toEqual(newHero);
  //         done();
  //       },
  //       error: done.fail,
  //     });
  //     expect(httpClientSpy.post).toHaveBeenCalledOnceWith(
  //       'api/heroes',
  //       newHero,
  //       service.httpOptions
  //     );
  //   });

  //   it('should return an error adding hero when the server returns a 404', (done: DoneFn) => {
  //     const errorResponse = {
  //       body: { error: 'test 404 error' },
  //       status: 404,
  //       statusText: 'Not Found',
  //     };

  //     const newHero: Hero = { id: 1, name: 'A' };

  //     httpClientSpy.post.and.returnValue(throwError(() => errorResponse));

  //     service.addHero(newHero).subscribe({
  //       next: (_) => done.fail('expected an error, not new hero'),
  //       error: (error) => {
  //         expect(error.name).toEqual('HeroOperationError');
  //         expect(error.message).toContain('test 404 error');
  //         done();
  //       },
  //     });
  //   });

  //   it('should put hero new values', (done: DoneFn) => {
  //     const modifiedHero: Hero = { id: 1, name: 'A' };

  //     httpClientSpy.put.and.returnValue(of(modifiedHero));

  //     service.updateHero(modifiedHero).subscribe({
  //       next: (hero) => {
  //         expect(hero).toEqual(modifiedHero);
  //         done();
  //       },
  //       error: done.fail,
  //     });
  //     expect(httpClientSpy.put).toHaveBeenCalledOnceWith(
  //       'api/heroes',
  //       modifiedHero,
  //       service.httpOptions
  //     );
  //   });

  //   it('should return an error updating hero when the server returns a 404', (done: DoneFn) => {
  //     const errorResponse = {
  //       body: { error: 'test 404 error' },
  //       status: 404,
  //       statusText: 'Not Found',
  //     };

  //     const modifiedHero: Hero = { id: 1, name: 'A' };

  //     httpClientSpy.put.and.returnValue(throwError(() => errorResponse));

  //     service.updateHero(modifiedHero).subscribe({
  //       next: (_) => done.fail('expected an error, not updated hero'),
  //       error: (error) => {
  //         expect(error.name).toEqual('HeroOperationError');
  //         expect(error.message).toContain('test 404 error');
  //         done();
  //       },
  //     });
  //   });

  //   it('should delete expected hero', (done: DoneFn) => {
  //     const heroId: number = 1;

  //     httpClientSpy.delete.and.returnValue(of(heroId));

  //     service.deleteHero(heroId).subscribe({
  //       next: (_) => {
  //         done();
  //       },
  //       error: done.fail,
  //     });
  //     expect(httpClientSpy.delete).toHaveBeenCalledOnceWith(
  //       'api/heroes/1',
  //       service.httpOptions
  //     );
  //   });

  //   it('should return an error deleting when the server returns a 404', (done: DoneFn) => {
  //     const errorResponse = {
  //       body: { error: 'test 404 error' },
  //       status: 404,
  //       statusText: 'Not Found',
  //     };

  //     httpClientSpy.delete.and.returnValue(throwError(() => errorResponse));

  //     service.deleteHero(1).subscribe({
  //       next: (_) => done.fail('expected an error, not deleted hero'),
  //       error: (error) => {
  //         expect(error.name).toEqual('HeroOperationError');
  //         expect(error.message).toContain('test 404 error');
  //         done();
  //       },
  //     });
  //   });
});
