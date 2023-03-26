import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { CartComponent } from './components/cart/cart.component';
import { EdittripComponent } from './components/edittrip/edittrip.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { UserComponent } from './components/user/user.component';
import { LoggedGuard } from './guard/logged.guard';
import { ManagerGuard } from './guard/manager.guard';
import { NotLoggedGuard } from './guard/not-logged.guard';

const routes: Routes = [
  {path:'cart', component:CartComponent},
  {path:'trips', component: TripsListComponent},
  {path:'', component: HomeComponent},
  {path:'add', component:AddTripComponent, canActivate:[ManagerGuard]},
  {path: 'trip/:id', component:TripDetailsComponent},
  {path: 'login', component:LoginComponent, canActivate:[NotLoggedGuard]},
  {path: 'register', component:RegisterComponent, canActivate:[NotLoggedGuard]},
  {path: 'logout', component:LogoutComponent},
  {path: 'admin-view', component:AdminViewComponent, canActivate:[ManagerGuard]},
  {path: 'edittrip/:id', component:EdittripComponent, canActivate:[ManagerGuard]},
  {path: 'user', component:UserComponent, canActivate:[LoggedGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
