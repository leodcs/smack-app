import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { User } from "../models/user.model";
import { BaseService } from "./base.service";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import * as firebase from "firebase/app";

@Injectable()
export class UserService extends BaseService {
  users:FirebaseListObservable<User[]>;

  constructor(public database: AngularFireDatabase,
              private authService: AuthService) {
    super();
  }

  createUser(user: User, uuid:string) {
    return this.database
      .object('/users/' + uuid)
      .set(user)
      .catch(this.handlePromiseError);
  }

  getUsers():FirebaseListObservable<User[]> {
    this.setUsers();
    return this.users;
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

  private setUsers() {
    this.users = <FirebaseListObservable<User[]>> this.database.list('/users', {
      query: {
        orderByChild: 'name'
      }
    })
      .map((users: User[]) => {
        return users.filter((user: User) => user.$key !== this.authService.currentUser.uid);
      });
  }
}
