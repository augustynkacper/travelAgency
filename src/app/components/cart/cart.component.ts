import { AbstractType, Component, Input } from '@angular/core';
import { CartTrip } from 'src/app/CartTrip';
import { CartService } from 'src/app/services/cart.service';
import { MenuColorService } from 'src/app/services/menu-color.service';
import { TripsService } from 'src/app/services/trips.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart:CartTrip[];

  constructor(
      private cartService: CartService,
      private tripService: TripsService,
      private userService: UserService,
      private mC:MenuColorService) {mC.notHome() };

  ngOnInit(){
    this.cartService.share.subscribe(x => {
      this.cart = x
    });
  }

  buy(){
    
    this.userService.buy(this.cart);
    this.tripService.buy(this.cart);
    this.cartService.clear();
  }

  sum() : number {
    var s : number = 0;
    for (var el of this.cart){
      s += el.trip.price * el.clicks;
    }
    return s;
  }

  click(id :number, x:number){
    var index = 0;
    this.cartService.share.subscribe(cart => {
      for (let cartItem of cart){
        if (cartItem.trip.id === id){
          if (cartItem.trip.freePlaces === cartItem.clicks && x===1) return;
          if (cartItem.trip.freePlaces === 0 && x==-1) return;
          cartItem.clicks += x;

          if (cartItem.clicks == 0){
            cart.splice(index, 1);
          }
          
          return;
        }
        index += 1;
      }
    });
  }


}
