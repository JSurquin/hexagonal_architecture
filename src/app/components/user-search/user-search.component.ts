import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import IDisplayUsers from '@/app/domain/ports/i-display-users';

@Component({
  selector: 'app-user-search',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  private searchTerms = new Subject<string>();

  constructor(
    @Inject('IDisplayUsersSearch') public usersDisplayer: IDisplayUsers
  ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // ask user list filtered each time the term changes
        tap((term: string) =>
          this.usersDisplayer.askUsersFiltered(term).subscribe()
        )
      )
      .subscribe();

    // reinitialise filter
    this.searchTerms.next('');
  }
}
