// Importation des fonctions nécessaires depuis le package NgRx Store
import { createReducer, on } from '@ngrx/store';
// Importation de toutes les actions liées aux posts pour pouvoir les utiliser dans le réducteur
import * as postsActions from '../actions/posts.actions';

// Définition de l'état initial du store pour les posts
export const initialState: any = {
  posts: [], // Une liste vide de posts au départ
  error: null, // Aucune erreur au départ
};

// Création du réducteur pour les posts
// Un réducteur est une fonction qui prend en entrée l'état actuel et une action,
// et retourne le nouvel état en fonction de cette action
export const postsReducer = createReducer(
  initialState, // On commence avec l'état initial défini ci-dessus
  // Lorsqu'on reçoit une action de succès de chargement des posts :
  on(postsActions.loadPostsSuccess, (state, { posts }) => ({
    ...state, // On garde l'état actuel...
    posts, // ...mais on met à jour la liste des posts avec les posts reçus
  })),
  // Lorsqu'on reçoit une action d'échec de chargement des posts :
  on(postsActions.loadPostsFailure, (state, { error }) => ({
    ...state, // On garde l'état actuel...
    error, // ...mais on met à jour l'erreur avec l'erreur reçue
  }))
);

// Un réducteur est au cœur de la logique Redux/NgRx. Il décrit comment l'état de l'application change en réponse à chaque action envoyée au store. Dans ce code, le réducteur écoute deux actions : loadPostsSuccess et loadPostsFailure. Selon l'action reçue, il met à jour l'état en conséquence.
