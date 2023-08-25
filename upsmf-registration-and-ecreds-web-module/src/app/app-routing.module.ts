import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './modules/user-authentication/components/login-page/login-page.component';


const routes: Routes = [
  {
    path: '', component: LoginPageComponent, pathMatch: 'full'
  },
  {
    path: 'claims', loadChildren: () => import('./modules/claims-management/claims-management.module').then(m => m.ClaimsManagementModule)
  },
  {
    path: 'authentication', loadChildren: () => import('./modules/user-authentication/user-authentication.module').then(m => m.UserAuthenticationModule)
  },
    {
    path: 'users', loadChildren: () => import('./modules/user-management/user-management.module').then(m => m.UserManagementModule)
  },
  // {
  //   path: 'admin', loadChildren: () => import('./modules/admin-management/admin-management.module').then(m => m.AdminManagementModule)
  // },
  {
    path: 'super-admin', loadChildren: () => import('./modules/super-admin-management/super-admin-management.module').then(m => m.SuperAdminManagementModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
