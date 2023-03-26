import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartTrip } from 'src/app/CartTrip';
import { Trip } from '../../Trip';
import { RouterModule, Routes } from '@angular/router'
import { faTurkishLiraSign } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';
import { TripsService } from 'src/app/services/trips.service';
import { MenuColorService } from 'src/app/services/menu-color.service';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrls: ['./trips-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TripsListComponent {
  @Output() cartEmitter = new EventEmitter();
  @Output() removeTripEmitter = new EventEmitter();

  @Input() trips : Trip[];
 
  clicks : number = 0;
  color: string = "red";

  @Input() max : number = 0;
  @Input() min : number = 999999999;

  cart : CartTrip[] = [];


  countries : string[] =[];
  country : string = "Any";
  minPrice : number = 0 ;
  maxPrice : number = 0 ;
  startDate : string = "";
  endDate : string = "";

  filter = {
    minPrice: 0,
    maxPrice: this.max,
    country: "Any",
    startDate: "0000-00-00",
    endDate: "9999-12-31"
  }

  constructor(private cartService : CartService,
              private tripsService: TripsService,
              private mC:MenuColorService) {mC.notHome(); }

  trips1 : Trip[];
  ngOnInit(){
    this.tripsService.share.subscribe(x => this.trips=x);
    this.cartService.share.subscribe(x => this.cart=x);
    this.updateMaxMin();
  }

  updateCartService() : void{
    this.cartService.updateData(this.cart);
  }

  updateTripService() : void {
    this.tripsService.updateData(this.trips);
  }

  propertyChanged(){
    this.updateMaxMin();
    this.createFilter()
  }

  createFilter(){
    if (this.maxPrice===0) this.maxPrice=this.max;
    if (this.startDate==="") this.startDate = "0000-00-00";
    if (this.endDate==="") this.endDate = "9999-12-31";

    var filter = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      startDate: this.startDate,
      endDate: this.endDate,
      countries: this.countries
    }
    return filter;
  }

 
  
  // increment or decrement total trips number
  receiveClick($event:any){
    this.clicks += $event.click;
    if (this.clicks>=10) this.color = "green";
    else this.color = "red";
    this.updateCart($event);

    var s="";
    for (let trip of this.trips) s += trip.freePlaces + " ";

    this.updateCartService();
  }

  // remove trip when trash clicked
  // update total trips number also
  removeTrip($event:any){
    //update total number of clicks
    this.clicks -= $event.clicks;
    if (this.clicks>=10) this.color = "green";
    else this.color = "red";

    this.removeTripEmitter.emit($event);
    this.updateCartService();
  }


  // used for highlighting the chepest and most expensive trip
  updateMaxMin(){
    var min=9999999;
    var max = 0;
    for (let i of this.trips){
      if (i.price > max) max = i.price;
      if (i.price < min) min = i.price;
    }
    this.min = min;
    this.max = max;
  }



  updateCart(data:any){
    var index:number = 0;
    for (let el of this.cart){
      
      // if trip found in cart, update number of chosen trips
      if (el.trip.id == data.trip.id){
        el.clicks += data.click;

        // if chosen trips places = 0, remove from cart
        if(el.clicks===0) this.cart.splice(index, 1);

        return;
      }
      index += 1;
    } 
    this.cart.push({trip:data.trip, clicks:data.click})  

    this.cartEmitter.emit(this.cart);
  }

  countryClick(s : string){
    var i = this.countries.indexOf(s)
    if (i === -1) {
      this.countries.push(s);
    } else {
      this.countries.splice(i, 1);
    }
  }
}
