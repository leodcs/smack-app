import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { User } from "../models/user.model";
import { BaseService } from "./base.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class UserService extends BaseService {
  users:FirebaseListObservable<User[]>;

  constructor(public database: AngularFireDatabase) {
    super();
    this.users = this.getUsers();
  }

  createUser(user: User) {
    return this.database
      .object('/users/' + user.uid)
      .set(user)
      .catch(this.handlePromiseError);
  }

  getUsers():FirebaseListObservable<User[]> {
    return this.database.list('/users');
  }

  usernameExists(username: string):Observable<any> {
    return this.database.list('/users', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    }).map((users: User[]) => {
      return users.length > 0;
    }).catch(this.handleObservableError);
  }
}
