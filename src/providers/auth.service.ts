import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";
import { BaseService } from "./base.service";


@Injectable()
export class AuthService extends BaseService {
  constructor(private afAuth: AngularFireAuth) {
    super();
  }

  signUp(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .catch(this.handlePromiseError);
  }

  signIn(email:string, password:string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).
      then((user) => {
        return(user);
      })
      .catch(this.handlePromiseError);
  }
}
