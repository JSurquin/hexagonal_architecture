import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { user } from '@/app/store/selectors/user.selector';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const store = inject(Store);
  const router: Router = inject(Router);

  let isAuth;

  store.select(user).subscribe((state) => {
    isAuth = state.user;
  });

  // Stocker l'URL demandée dans le cas où l'utilisateur n'est pas authentifié
  const requestedUrl = state.url;

  if (Object.keys(isAuth as any).length === 0) {
    router.navigate(['/login'], { queryParams: { returnUrl: requestedUrl } });
    return false;
  }

  return true;
};
