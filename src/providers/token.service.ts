import { Injectable } from '@angular/core';
import { Angular2TokenService } from "angular2-token";
import { apiBasePath } from "../environment";

@Injectable()
export class TokenService {

  constructor(public _service: Angular2TokenService) {
    this._service.init({ apiBase: apiBasePath })
  }
}
