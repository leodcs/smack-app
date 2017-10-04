import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseProvider } from "./base.provider";
import { TokenService } from "./token.service";

@Injectable()
export class AuthProvider extends BaseProvider {

  constructor(private tokenService: TokenService) {
    super();
  }

  signIn(email:string, password:string) {
    return this.tokenService._service.signIn({
      email:    email,
      password: password
    }).map(this.extractData);
  }

  signOut() {
    return this.tokenService._service.signOut();
  }

  signUp(name: string, email: string, password: string, username: string) {
    return this.tokenService._service.registerAccount({
      name: name,
      email: email,
      password: password,
      passwordConfirmation: password,
      username: username
    }).map(this.extractData);
  }

  isAuthenticated() {
    return this.tokenService._service.userSignedIn();
  }

  get currentUser() {
    return this.tokenService._service.currentUserData;
  }
}
