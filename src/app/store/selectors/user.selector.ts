import { createFeatureSelector, createSelector } from '@ngrx/store';

export const userState = createFeatureSelector<any>('userState');

console.log('userState', userState);
export const user = createSelector(userState, (state: any) => state);
