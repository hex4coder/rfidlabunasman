import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AdminComponent } from './shared/admin/admin.component';
import { LoginComponent } from './shared/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

// auth guard firebase
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToDashboard = () => redirectLoggedInTo(['admin']);

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin,
    },
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      authGuardPipe: redirectLoggedInToDashboard,
    },
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
