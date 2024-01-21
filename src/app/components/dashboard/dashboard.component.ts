import { Component, Inject, OnInit } from '@angular/core';
import IDisplayUsers from '@/app/domain/ports/i-display-users';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserSearchComponent } from '../user-search/user-search.component';
import IDisplayArticles from '@/app/domain/ports/i-display-articles';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, UserSearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    @Inject('IDisplayUsers') public usersDisplayer: IDisplayUsers,
    @Inject('IDisplayArticles') public articlesDisplayer: IDisplayArticles
  ) {}

  ngOnInit(): void {
    this.usersDisplayer.askUsersList().subscribe();
  }
}
