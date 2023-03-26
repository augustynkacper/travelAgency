import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TripComponent } from './components/trip/trip.component';
import { TripsListComponent } from './components/trips-list/trips-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StarRateComponent} from './components/star-rate/star-rate.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { CartComponent } from './components/cart/cart.component';
import { MyFilterPipe } from './FilterPipe.pipe';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { EdittripComponent } from './components/edittrip/edittrip.component';
import { UserComponent } from './components/user/user.component';







@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    TripsListComponent,
    StarRateComponent,
    AddTripComponent,
    CartComponent,
    MyFilterPipe,
    HomeComponent,
    TripDetailsComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    AdminViewComponent,
    EdittripComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
