import { createAction, props } from '@ngrx/store';

export const log = createAction('[User] login requested');

export const login = createAction(
  '[User] login successfull', // Nom de l'action
  props<{ user: any[] }>() // Propriétés associées à l'action : ici une liste de posts
);

export const loginFailure = createAction(
  '[User] logout success', // Nom de l'action
  props<{ error: any }>() // Propriétés associées à l'action : ici une erreur
);
