import { Component, Inject, OnInit, inject } from '@angular/core';
import IDisplayArticles from '@/app/domain/ports/i-display-articles';
import { CommonModule } from '@angular/common';
import { ArticleAdapterService } from '@/app/domain/adapters/article-adapter.service';
import { Articles } from '@/app/domain/models/articles';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export default class ArticlesComponent implements OnInit {
  posts!: any;
  constructor(
    @Inject('IDisplayArticles') public articlesDisplayer: IDisplayArticles
  ) {}
  articles: Articles[] = [];

  articleDisplayer2 = inject(ArticleAdapterService);

  ngOnInit(): void {
    this.articleDisplayer2
      .getArticles()
      .subscribe((articles) => (this.articles = articles));
    // this.articlesDisplayer
    //   .askArticles()
    //   .subscribe(
    //     pipe((articles2) => (this.articles = this.articlesDisplayer.Articles))
    //   );
  }
}
