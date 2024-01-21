import { Injectable, Inject } from '@angular/core'; // Permet de déclarer une classe comme service injectable
import { Actions, ofType, createEffect } from '@ngrx/effects'; // Outils pour créer et gérer les effets NgRx
import { map, mergeMap, catchError } from 'rxjs/operators'; // Opérateurs pour traiter les observables
import * as postsActions from '../actions/posts.actions'; // Importe toutes les actions liées aux posts
import IDisplayArticles from 'src/app/domain/ports/i-display-articles';

@Injectable()
export class PostsEffects {
  // Déclaration de la classe PostsEffects

  // Création d'un effet pour charger les posts
  loadPosts = createEffect(() =>
    // Crée un nouvel effet
    this.actions$.pipe(
      // Écoute toutes les actions dispatchées dans l'application
      ofType(postsActions.loadPosts), // Filtrage pour n'écouter que l'action 'loadPosts'
      mergeMap(() =>
        // Fusionne l'action avec le résultat de l'appel au service
        this.articlesDisplayer.askArticles().pipe(
          // Appel au service pour obtenir les posts
          map((posts) =>
            postsActions.loadPostsSuccess({
              posts: this.articlesDisplayer.Articles,
            } as any)
          ), // Si l'appel réussit, dispatch l'action de succès avec les posts
          catchError((error) => [postsActions.loadPostsFailure({ error })]) // En cas d'erreur, dispatch l'action d'échec avec l'erreur
        )
      )
    )
  );

  // Le constructeur de la classe
  constructor(
    private actions$: Actions,
    @Inject('IDisplayArticles') public articlesDisplayer: IDisplayArticles
  ) {} // Injecte les dépendances nécessaires : Actions pour écouter les actions et PostsService pour appeler le service
}

// Un effet (Effect) dans NgRx est utilisé pour interagir ou causer des effets secondaires dans une application. Ces effets secondaires peuvent inclure des choses comme la communication avec une API externe, la manipulation de données, ou même des interactions avec des services ou des composants. Au lieu d'intégrer cette logique directement dans les composants ou dans les réducteurs, les effets offrent un endroit centralisé pour gérer ces interactions.
// Les effets écoutent les actions dispatchées par les composants ou d'autres parties de l'application. Lorsqu'une action spécifique est détectée, l'effet peut effectuer une tâche (comme faire un appel API) et, une fois terminé, peut dispatcher une nouvelle action pour mettre à jour le store ou signaler le résultat de la tâche.
// En utilisant les effets, on sépare la logique des effets secondaires de la logique de mise à jour de l'état, ce qui rend le code plus propre, plus facile à tester et à maintenir.
