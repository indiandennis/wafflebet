import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './signin/signin.component';
import {SignupComponent} from './signup/signup.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component';
import {LoginModalGuard} from './login-modal.guard';
import {DashboardComponent} from './dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'signin',
    component: SigninComponent,
    outlet: 'loginModal',
    canActivate: [LoginModalGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    outlet: 'loginModal',
    canActivate: [LoginModalGuard]
  },
  {
    path: 'forgotpass',
    component: ForgotPassComponent,
    outlet: 'loginModal',
    canActivate: [LoginModalGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
