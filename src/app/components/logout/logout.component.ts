import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private userService: UserService) {
    userService.SignOut();
  }

  ngOnInit() : void{ 
    this.userService.SignOut();
  }

}
