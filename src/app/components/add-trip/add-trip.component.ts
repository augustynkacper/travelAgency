import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MenuColorService } from 'src/app/services/menu-color.service';
import { TripsService } from 'src/app/services/trips.service';
import { Trip } from 'src/app/Trip';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})
export class AddTripComponent {

  @Output() tripEmitter = new EventEmitter();


  tripForm = new FormGroup({
    name: new FormControl(''),
    country: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    price: new FormControl(''),
    places : new FormControl(''),
    imgurl : new FormControl('')
  });

  constructor(private tripsService:TripsService,
    private mC:MenuColorService) {mC.notHome() };

  getTrip() {
    let trip = this.tripForm.value;

    if(! /^\d*$/.test(trip['price'] as string)){
      alert("You entered wrong price!"); return;
    }

    if(! /^\d*$/.test(trip['places'] as string)){
      alert("You entered wrong places number!"); return;
    }

    let d1 = new Date(trip.startDate as string);
    let d2 = new Date(trip.endDate as string);
    if(d1 > d2) {
      alert("Start date is smaller than end date!");
      return;
    }

    if (trip['name']==="" || trip['country']==='' || trip['startDate']==='' ||
    trip['endDate']==='' || trip['price']==='' || trip['places']===''){
      alert("You have to enter all properties!");
      return;
    }

    var newTrip = {
      name: trip.name,
      country: trip.country,
      startDate: trip.startDate, 
      endDate: trip.endDate,
      price: parseInt(trip.price as string),
      freePlaces: parseInt(trip.places as string),
      img: trip.imgurl,
      id:this.createId(),
      reviews:0,
      stars:0,
      detailedReviews: []
    }

    let trips : Trip[];

    this.tripsService.addTrip(newTrip as Trip);

  }

  sendTrip(trip : Trip) : void{
    this.tripEmitter.emit(trip);
  }


  createId() : number{
    var id : number = Math.floor(Math.random()*1000000);
    while (this.existsId(id))
      id = Math.floor(Math.random()*500);
    return id;
  }
  existsId(id:number):boolean{
    this.tripsService.share.subscribe(trips => {
      for (var trip of trips){
        if (trip.id === id ) return true;
      }
      return false;
    });
    return false;
  }

}
