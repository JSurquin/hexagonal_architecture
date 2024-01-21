import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from '../infrastructure/auth-guard';
// import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login.component'),
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'articles',
    loadComponent: () => import('./articles/articles.component'),
    // canActivate: [AuthGuard],
  },
  {
    path: 'articles_without_store',
    loadComponent: () => import('./articles_without_store/articles.component'),
  },
  { path: 'detail/:id', component: UserDetailComponent },
  { path: 'users', loadComponent: () => import('./users/users.component') },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
