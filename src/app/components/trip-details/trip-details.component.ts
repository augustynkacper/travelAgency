import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';
import { Trip } from 'src/app/Trip';
import { FormsModule } from '@angular/forms';
import { IReview } from 'src/app/IReview';
import { ThisReceiver } from '@angular/compiler';
import { UserService } from 'src/app/services/user.service';
import { MenuColorService } from 'src/app/services/menu-color.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent {

  constructor(private route: ActivatedRoute,
    private  tripsService : TripsService,
    public userService: UserService,
    private mC:MenuColorService){mC.notHome()};

  
  nick : string = this.userService.user.nick;
  review : string = "";


  trip : Trip;

  reviews : IReview[] =[];

  ngOnInit(){
    this.reviews = [];
    this.route.params.subscribe(params => {
      var id = parseInt(params['id']);

      this.tripsService.share.subscribe(trips => {
        for (var trip of trips){
          if (trip.id == id){
            this.trip = trip; 
            //this.reviews = trip.detailedReviews;
            for (var i in trip.detailedReviews){
              this.reviews.push(trip.detailedReviews[i]);
            }
            return;
          }
        }
      })

    });

  }

  addReview(){
    if (this.nick == "") {
      alert("Enter your nick!");
      return;
    }
    if (this.review === "") {
      alert("Enter review!");
      return;
    }

    this.tripsService.addReview(this.trip, {'nick': this.nick, 'review': this.review})
    this.reviews = [];
    return;
  }

  getClass(n : number){
    if (n <= this.trip.stars+0.5) return "yellow";
    return "white";
  }

  getStars(n : number) {
    if (!this.userService.hasBought(this.trip.id)){
      alert("you have to book this trip to review it");
      return;
    }
    /*
    this.tripsService.share.subscribe(trips => {
      for (var trip of trips){
        if (trip.id == this.trip.id){
          this.trip.stars = (this.trip.stars*this.trip.reviews+n)/(this.trip.reviews+1);
          this.trip.reviews += 1;

          return;
        }
      }
    })*/
    this.trip.stars = (this.trip.stars*this.trip.reviews+n)/(this.trip.reviews+1);
          this.trip.reviews += 1;
    this.tripsService.updateTrip(this.trip);

  }


}
