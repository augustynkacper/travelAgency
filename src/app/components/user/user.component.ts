import { Component } from '@angular/core';
import { BoughtTrip } from 'src/app/BoughtTrip';
import { MenuColorService } from 'src/app/services/menu-color.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  bought : BoughtTrip[] = [];

  constructor (public userService: UserService,
    private mc:MenuColorService){
      mc.notHome();
    for (var i in userService.user.bought){
      this.bought.push(userService.user.bought[i]);
    }

  };

}
