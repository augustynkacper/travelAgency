import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { CartTrip } from './CartTrip';
import { CartService } from './services/cart.service';
import { TripsService } from './services/trips.service';
import { Trip } from './Trip';
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { UserService } from './services/user.service';
import { MenuColorService } from './services/menu-color.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trips';

  cart : CartTrip[];
  trips : Trip[];

  color : string = "white";


  ngOnInit() {
    this.cartService.share.subscribe(x => this.cart = x);
    this.tripsService.share.subscribe(x => this.trips = x);
  }

  constructor(private tripsService: TripsService, 
            private cartService : CartService,
            public userService: UserService,
            public mC: MenuColorService) {
             };


  signout(){
    this.userService.SignOut();
    this.userService.setLoggedIn(false);
  }

  receiveCart($event:any){
    this.cart = $event;
  }
  
  updateTripsService() : void {
    this.tripsService.updateData(this.trips);
  }

  removeTrip($event:any){
    for (var i=0; i<this.trips.length; i++){
      if (this.trips[i].id===$event.trip.id){
        this.trips.splice(i, 1);
        break;
      }
    }

    for (var i=0; i<this.cart.length; i++){
      if (this.cart[i].trip.id===$event.trip.id){
        this.cart.splice(i, 1);
        break;
      }
    }
    
    this.updateTripsService();
  }
  // functions for receiving trip
  // createId -> self explaining
  // existsId -> checks if id already exists in trips array
  receiveTrip($event:any){
    let trip:Trip = $event;
    trip.id = this.createId();
    this.trips.push($event);

    this.updateTripsService();
  }
  createId() : number{
    var id : number = Math.floor(Math.random()*500);
    while (this.existsId(id))
      id = Math.floor(Math.random()*500);
    return id;
  }
  existsId(id:number):boolean{
    for (var i of this.trips)
      if (i.id === id) return true;
    return false;
  }
  getMin(){
    var min = 9999999;
    for (var el of this.trips){
      if (el.price < min) min = el.price;
    }
    return min;
  }

  homeClick(){
    this.color = "white";
  }

  notHomeClick(){
    this.color = "black"
  }
  
  // ---------------------------------------------------------
}
