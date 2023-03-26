
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../Trip';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IReview } from '../IReview';
import { stringify } from '@firebase/util';
import { CartTrip } from '../CartTrip';

@Injectable ({
    providedIn: 'root'
})

export class TripsService{
    private content = new BehaviorSubject<Trip[]>([]);
    public share = this.content.asObservable();


    constructor(private db: AngularFireDatabase) {

        const itemsRef : AngularFireList<any> = db.list("trips");
        itemsRef.valueChanges().subscribe( x => {
            var trips: any[] = [];
            for (var i in x){
                trips.push(x[i]);
            }
            this.content.next(trips);
        });

     }

    ngOnInit() {
        
    }

    updateData(trips: Trip[]) : void {
        this.content.next(trips);
    }

 
    addTrip(trip : Trip) {

        this.db.database.ref('/trips').child(stringify(trip.id)).set(trip);
        
    }

    removeTrip(trip : Trip) {
        this.db.database.ref('/trips').child(stringify(trip.id)).remove();
        console.log("removed...")
    }

    addReview(trip:Trip, review:IReview){
        this.db.database.ref('trips/'+trip.id+"/"+"detailedReviews").push(review);
    }

    updateTrip(trip:Trip){
        this.db.database.ref('trips/'+trip.id).update(trip);
    }

    buy(cart: CartTrip[]){
        for (var i in cart){
            let trip = cart[i].trip;
            let tickets = cart[i].clicks;

            this.db.database.ref('trips/'+trip.id).update({freePlaces:trip.freePlaces-tickets});

        }
    }


}