
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import {CartTrip} from '../CartTrip';

@Injectable ({
    providedIn: 'root'
})

export class CartService{
    private content = new BehaviorSubject<CartTrip[]>([]);
    public share = this.content.asObservable();

    constructor() { }

    updateData(cart : CartTrip[]) : void {
        this.content.next(cart);
    }

    clear(){
        //this.content = new BehaviorSubject<CartTrip[]>([]);
        //this.share = this.content.asObservable();
        this.share.subscribe(cart => {
            var l = cart.length;
           
                cart.splice(0,l);
            
        });
    }


    
}