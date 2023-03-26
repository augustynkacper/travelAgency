import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-star-rate',
  templateUrl: './star-rate.component.html',
  styleUrls: ['./star-rate.component.css']
})
export class StarRateComponent {

  @Output() starsEmitter = new EventEmitter();
  @Input() stars : number;

  faStar = faStar;

  sendStars() : void{
    this.starsEmitter.emit(this.stars);
  }

}
