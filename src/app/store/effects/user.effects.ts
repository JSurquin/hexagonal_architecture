import { Injectable, Inject } from '@angular/core'; // Permet de déclarer une classe comme service injectable
import { Actions, ofType, createEffect } from '@ngrx/effects'; // Outils pour créer et gérer les effets NgRx
import { map, mergeMap, catchError, tap } from 'rxjs/operators'; // Opérateurs pour traiter les observables
import * as userActions from '../actions/user.action'; // Importe toutes les actions liées aux posts
import IDisplayArticles from 'src/app/domain/ports/i-display-articles';
import IManageAuthentication from '@/app/domain/ports/i-manage-authentication';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class UserEffects {
  loadTest = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.log), // Filtrage pour n'écouter que l'action 'loadPosts'
      mergeMap(() =>
        this.manageAuthentication.login().pipe(
          map((posts) => {
            const actions = userActions.login({
              user: { isAuthenticated: true },
            } as any);
            return actions;
          }),
          tap((posts) => {
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/'; // Par défaut, rediriger vers la page d'accueil
            this.router.navigateByUrl(returnUrl);
          })
        )
      )
    )
  );

  // Le constructeur de la classe
  constructor(
    private actions$: Actions,
    @Inject('IManageAuthentication')
    public manageAuthentication: IManageAuthentication,
    private route: ActivatedRoute,
    private router: Router
  ) {} // Injecte les dépendances nécessaires : Actions pour écouter les actions et PostsService pour appeler le service
}
