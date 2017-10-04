import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseProvider } from "./base.provider";
import { User } from "../models/user.model";
import { TokenService } from "./token.service";

@Injectable()
export class UserProvider extends BaseProvider {
  resourceUrl:string = "/api/users";
  user: User;

  constructor(private tokenService: TokenService) {
    super();
  }

  getUsers() {
    return this.tokenService._service.get(this.resourceUrl)
      .map(this.extractData);
  }
}
