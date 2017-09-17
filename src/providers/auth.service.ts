import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";


@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  signIn(email:string, password:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
}
