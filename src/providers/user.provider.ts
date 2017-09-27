import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { BaseProvider } from "./base.provider";
import { apiHostUrl } from "../environment";
import { AuthService } from "./auth.service";
import { User } from "../models/user.model";

@Injectable()
export class UserProvider extends BaseProvider {
  resourceUrl:string = apiHostUrl + "/users";
  user: User;

  constructor(public authService: AuthService,
              private http: Http) {
    super();
  }

  get currentUser(): User {
    this.authService.afAuth.authState.subscribe((authState) => {
      if (authState) {
        this.getUserByUid(authState.uid)
          .first()
          .subscribe((user: User) => {
            this.user = user
          });
      }
    });
    return this.user;
  }

  getUserByUid(uid:string) {
    return this.http.get(this.resourceUrl + `/${uid}`)
      .map(this.extractData);
  }

  getUsers() {
    return this.http.get(this.resourceUrl)
      .map(this.extractData);
  }

  createUser(user: User, uid:string) {
    return this.http.post(this.resourceUrl, {
      uid: uid,
      name: user.name,
      email: user.email,
      username: user.username
    });
  }
}
