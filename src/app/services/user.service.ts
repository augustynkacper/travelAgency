import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

import { BoughtTrip } from '../BoughtTrip';
import { CartTrip } from '../CartTrip';
import { User } from '../User';
import { TripsService } from './trips.service';


@Injectable({
  providedIn: 'root'
})


export class UserService {

  public user : User;
  users : User[] =[];
  private loggedIn : boolean = true;

  constructor( private db: AngularFireDatabase, 
          private afAuth: AngularFireAuth, 
          private router:Router, 
          private tripsService:TripsService) { 

        this.user = this.getGuest();
        this.loggedIn = false;

  }

  SignIn(email: string, password: string){
 
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        //this.SetUserData(result.user);
        this.afAuth.authState.subscribe(user => {
          if (user) {
            this.SetUserData(user);
            this.router.navigate([''])
            this.loggedIn = true;
          }
         
        })
      })
      .catch((error) => {
        window.alert(error.message);
      });
    
    
  }

  SignUp(email: string, password: string, nick:string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {

        if (res.user){
          var user : User = {
            email: email,
            nick: nick,
            ban:false,
            bought: [],
            id: res.user.uid,
            roles: {
              client:true,
              admin:false,
              manager:false
            }
          }
          this.router.navigate(['']);
          this.db.database.ref('/users').child(user.id).set(user);
          this.loggedIn = true;
        }

      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      //localStorage.removeItem('user');
      this.user = this.getGuest();
      this.loggedIn = false;
      this.router.navigate(['login']);
    });
  }

  buy(cart: CartTrip[]){

    for (var el of cart){
      let obj:BoughtTrip = {
        name: el.trip.name,
        tickets: el.clicks,
        startDate:el.trip.startDate,
        endDate:el.trip.endDate,
        id: el.trip.id,
        totalPrice:el.clicks*el.trip.price
      }
      this.db.database.ref('users/'+this.user.id+'/bought').push(obj);
    }

    this.afAuth.authState.subscribe(user => this.SetUserData(user));

  }
  

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLoggedIn(value : boolean){
    this.loggedIn = value;
  }

  SetUserData(user: any) {

    const userRef: AngularFireList<any> = this.db.list(`users/${user.uid}`);

    userRef.valueChanges().subscribe(x => {
      if (x.length==5){
        var user : User = {
          ban: x[0],
          bought: [],
          email: x[1],
          id: x[2],
          nick: x[3],
          roles: {
            admin: x[4].admin,
            client: x[4].client,
            manager: x[4].manager
          }
        }
      }
      else{

      var user : User = {
        ban: x[0],
        bought: x[1],
        email: x[2],
        id: x[3],
        nick: x[4],
        roles: {
          admin: x[5].admin,
          client: x[5].client,
          manager: x[5].manager
        }
      }
    }
      
      this.user = user;
    });
  }

  isClient(){
    return this.user.roles.client == true;
  }

  isAdmin(){
    return this.user.roles.admin == true;
  }

  isManager(){
    return this.user.roles.manager==true || this.user.roles.admin==true;
  }


  hasBought(id:number) : boolean{
    for (var i in this.user.bought){
      if (this.user.bought[i].id == id) return true;
    }
    return false;
  }

  getGuest(){
    var user:User = {
      nick:'',
      email:'',
      id:'',
      ban:false,
      bought: [],
      roles: {
        admin:false,
        client:false,
        manager:false
      }
    }
    return user;
  }


}
