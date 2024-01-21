// posts.reducer.spec.ts

import * as postsActions from '../actions/posts.actions';
import { initialState, postsReducer } from './posts.reducer';

describe('Posts Reducer', () => {
  it('should handle loadPostsSuccess action', () => {
    const posts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];
    const action = postsActions.loadPostsSuccess({ posts });

    const newState = postsReducer(initialState, action);

    expect(newState.posts).toEqual(posts);
    expect(newState.error).toBeNull();
  });

  it('should handle loadPostsFailure action', () => {
    const error = 'An error occurred';
    const action = postsActions.loadPostsFailure({ error });

    const newState = postsReducer(initialState, action);

    expect(newState.error).toEqual(error);
    expect(newState.posts).toEqual(initialState.posts);
  });

  // Add more tests based on your reducer logic and actions
});
