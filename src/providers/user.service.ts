import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { User } from "../models/user.model";

@Injectable()
export class UserService {
  users:FirebaseListObservable<User[]>;

  constructor(public database: AngularFireDatabase) {
    this.users = this.getUsers();
  }

  createUser(user: User) {
    console.log(user);
    return this.database
      .object('/users/' + user.uid)
      .set(user);
  }

  getUsers():FirebaseListObservable<User[]> {
    return this.database.list('/users');
  }
}
