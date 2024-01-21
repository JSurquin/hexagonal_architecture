// post.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPostState = createFeatureSelector<any>('postState');

console.log('selectPostState', selectPostState);
export const selectPosts = createSelector(
  selectPostState,
  (state: any) => state
);
