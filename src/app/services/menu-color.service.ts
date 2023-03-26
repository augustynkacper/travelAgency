import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuColorService {

  color:string = "black";
  borderColor:string = "#d1d1d1";

  constructor() { }

  notHome(){
    this.color="black";
    this.borderColor="#d1d1d1";
  }

  home(){
    this.color = "rgb(255, 224, 224)";
    this.borderColor = "#a15d5d";
  }
}
