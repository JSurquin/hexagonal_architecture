import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as postsActions from '@/app/store/actions/posts.actions';
import { selectPosts } from '../../store/selectors/post.selectors';
import { Observable } from 'rxjs';
import { Articles } from '@/app/domain/models/articles';
import { user } from '@/app/store/selectors/user.selector';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlesComponent implements OnInit {
  posts: Articles[] | undefined;
  private store = inject(Store);
  private changeDetector = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.store.dispatch(postsActions.loadPosts());
    this.store.select(selectPosts).subscribe((state) => {
      this.posts = state.posts;
      this.changeDetector.markForCheck();
    });
  }
}
