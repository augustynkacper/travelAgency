import { Component } from '@angular/core';
import { MenuColorService } from 'src/app/services/menu-color.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email : string = "";
  password: string = "";
  nick:string = "";


  constructor(private userService : UserService,
    private mC:MenuColorService) {mC.notHome() };

  register() : void {
    this.userService.SignUp(this.email, this.password, this.nick);
  }

}
