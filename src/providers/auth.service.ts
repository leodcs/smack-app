import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";
import { BaseService } from "./base.service";
import { Ng2Cable } from "ng2-cable";

@Injectable()
export class AuthService extends BaseService {
  user: any;
  authenticated:boolean = false;

  constructor(public afAuth: AngularFireAuth) {
    super();
  }

  signUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).
    then((user) => {
      return(user);
    });
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  isAuthenticated():boolean{
    return this.afAuth.auth.currentUser != null;
  }

  get currentUser() {
    return this.afAuth.auth.currentUser;
  }
}
