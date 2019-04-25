import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuardService } from './shared/services/auth.service';
import { UserBookingsComponent } from './pages/user-bookings/user-bookings.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login-form',
  },
  {
    path: 'login-form',
    component: LoginFormComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'userBookings',
    component: UserBookingsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
