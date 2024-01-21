// Importation des fonctions nécessaires depuis le package NgRx Store
import { createAction, props } from '@ngrx/store';

export const loadPosts = createAction('[Posts Page] Load Posts');

// Création d'une action pour indiquer le succès du chargement des posts
// Cette action est généralement dispatchée lorsque l'API renvoie avec succès les posts
// Elle transporte également les posts récupérés (d'où l'utilisation de `props` qui permet de définir les propriétés additionnelles de l'action)
export const loadPostsSuccess = createAction(
  '[Posts API] Load Posts Success', // Nom de l'action
  props<{ posts: any[] }>() // Propriétés associées à l'action : ici une liste de posts
);

// Création d'une action pour indiquer un échec lors du chargement des posts
// Cette action est généralement dispatchée lorsque l'API renvoie une erreur
// Elle transporte également l'erreur obtenue (d'où l'utilisation de `props`)
export const loadPostsFailure = createAction(
  '[Posts API] Load Posts Failure', // Nom de l'action
  props<{ error: any }>() // Propriétés associées à l'action : ici une erreur
);

// Les actions sont des descriptions de "choses qui se passent" dans votre application. Elles sont dispatchées (envoyées) par les composants ou les effets et sont interceptées par les réducteurs pour mettre à jour l'état de l'application. Ces trois actions décrivent le processus de chargement des posts : début, succès ou échec.
