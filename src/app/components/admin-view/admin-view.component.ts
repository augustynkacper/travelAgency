import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { UserService } from 'src/app/services/user.service';
import { Roles, User } from 'src/app/User';
import { faCheckCircle, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { MenuColorService } from 'src/app/services/menu-color.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {

  role :string ="";

  faCheck = faCheckCircle;
  faNotCheck = faCircleXmark;

  roleChanged(id : string){
    console.log(id, this.role);
    this.db.database.ref('users/'+id).update({role:this.role});
    this.role = "";

  }

  setAdmin(id:string, value:boolean){
    this.db.database.ref('users/'+id+'/roles').update({admin: value });
  }

  setClient(id:string, value:boolean){
    this.db.database.ref('users/'+id+'/roles').update({client: value });
  }

  setManager(id:string, value:boolean){
    this.db.database.ref('users/'+id+'/roles').update({manager: value });
  }
  
  users : User[] = [];

  constructor (public userService:UserService,
        private db: AngularFireDatabase,
        private afAuth: AngularFireAuth,
        private mC:MenuColorService)  { 
            mC.notHome();
    const itemsRef : AngularFireList<any> = db.list("users");

        itemsRef.valueChanges().subscribe( x => {
            this.users = [];
            for (var i in x)
                this.users.push(x[i]);
  
        });



  };



  ban(id:string, b:boolean){
    this.db.database.ref('users/'+id).update({ban: b});
  }

}
