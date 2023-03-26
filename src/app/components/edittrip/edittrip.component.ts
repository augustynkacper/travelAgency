import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuColorService } from 'src/app/services/menu-color.service';
import { TripsService } from 'src/app/services/trips.service';
import { Trip } from 'src/app/Trip';

@Component({
  selector: 'app-edittrip',
  templateUrl: './edittrip.component.html',
  styleUrls: ['./edittrip.component.css']
})
export class EdittripComponent {

  trip : Trip;
  newTrip : Trip;

  constructor(private route: ActivatedRoute,
    private  tripsService : TripsService,
    private router:Router,
    private mC:MenuColorService) {mC.notHome() };
    

  ngOnInit(){
    this.route.params.subscribe(params => {
      var id = params['id'];

      this.tripsService.share.subscribe(trips => {
        for(var trip of trips){
          if (trip.id==id) {
            this.trip = trip;
            this.newTrip = Object.assign({}, trip)
            return;
          }
        }
    
      })
    })
  }

  editTrip(){
    this.router.navigate(['trip/'+this.trip.id])
    this.tripsService.updateTrip(this.newTrip);
  }
}
