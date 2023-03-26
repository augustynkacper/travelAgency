import { Component } from '@angular/core';
import { MenuColorService } from 'src/app/services/menu-color.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  

  constructor(private mC:MenuColorService){
    mC.home();
  }

}
