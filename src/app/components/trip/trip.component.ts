
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges  } from '@angular/core';
import { Trip } from '../../Trip'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { TripsService } from 'src/app/services/trips.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { MenuColorService } from 'src/app/services/menu-color.service';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent{

  @Input() trip:Trip;
  @Input() max : number;
  @Input() min : number;

  @Output() clickEmitter = new EventEmitter();
  @Output() removeEmitter = new EventEmitter();

  freePlacesInfo : string ;
  freePlaces : number;
  clicks:number = 0;

  faTrash = faTrash;

  stars : number =0;

  color : string = "green";
  opacity: number = 0.4;
  border : string = "none";

  constructor( private tripsService : TripsService,
                private cartService : CartService,
                public userService : UserService,
                private mC:MenuColorService) {mC.notHome() };

  ngOnInit() : void {
    this.freePlaces  = this.trip.freePlaces;
   
    this.stars = this.trip.stars;

    this.cartService.share.subscribe(cart => {
      for (let cartItem of cart){
        if (cartItem.trip.id === this.trip.id){
          this.clicks = cartItem.clicks;
          break;
        }
       
      }
    })
  }



  // clicking the trip - update background to highlight places availability
  // and send click to parent component to update sum of chosen trips
  click(i : number) : void {
    if (i==1 && this.trip.freePlaces == this.clicks) return;
    if (i==-1 && this.clicks == 0) return;

    this.clicks += i;
    var index = 0;

    this.cartService.share.subscribe(cart => {
      for (let cartItem of cart){
        if (cartItem.trip.id === this.trip.id){
          cartItem.clicks += i;

          if (cartItem.clicks == 0){
            cart.splice(index, 1);
          }
          
          return;
        }
        index += 1;
      }
      if (i==-1) return;

      this.cartService.share.subscribe(cart => {
        cart.push({'trip': this.trip, 'clicks':1});
      })
    });
    


  }




  // if star clicked, save number of clicked stars
  getStars($event : number){
    if ($event == this.stars) this.stars = 0;
    else this.stars = $event;
  }
  // for coloring stars depending on rate user clicked
  getClass(n : number){
    if (n <= this.trip.stars+0.5) return "yellow";
    return "white";
  }
  removeTrip(){
    //this.removeEmitter.emit(
    //  {trip: this.trip, clicks: this.clicks}
    //);
    this.tripsService.removeTrip(this.trip);
    // remove trip from trips list
    
    this.tripsService.share.subscribe(trips => {
      var index : number = 0;
      for (let trip of trips){
        if (trip.id === this.trip.id){
          trips.splice(index, 1);
          break;
        }
        index ++;
      }
    })

    // remove trip from cart
    this.cartService.share.subscribe(cart => {
      var index : number = 0;
      for (let cartItem of cart){
        if (cartItem.trip.id === this.trip.id){
          cart.splice(index, 1);
          break;
        }
        index ++;
      }
    })

  }


}
