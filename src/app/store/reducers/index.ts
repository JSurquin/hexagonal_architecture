import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { postsReducer } from './posts.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  posts: postsReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
