import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuColorService } from 'src/app/services/menu-color.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email : string = "";
  password: string = "";

  constructor( private userService: UserService,
              private router: Router,
              private mC:MenuColorService) {mC.notHome() };

  login(){
    this.userService.SignIn(this.email, this.password)
  }

}
