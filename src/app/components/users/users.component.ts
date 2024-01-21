import { Component, Inject, OnInit, inject } from '@angular/core';
import IDisplayUsers from '@/app/domain/ports/i-display-users';
import { selectPosts } from '../../store/selectors/post.selectors';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export default class HeroesComponent implements OnInit {
  constructor(@Inject('IDisplayUsers') public usersDisplayer: IDisplayUsers) {}

  private store = inject(Store);

  posts!: any;

  ngOnInit(): void {
    this.store.select(selectPosts).subscribe((state) => {
      this.posts = state.posts;
      console.log('this.posts', this.posts);
    });
    this.usersDisplayer.askUsersList().subscribe();
  }
}
