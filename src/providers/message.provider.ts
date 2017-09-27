import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseProvider } from "./base.provider";
import { apiHostUrl } from "../environment";

@Injectable()
export class MessageProvider extends BaseProvider {
  constructor(public http: Http) {
    super();
  }

  create(text: string, sender_uid: string, chat_id: number) {
    return this.http.post(apiHostUrl + `/${chat_id}/${sender_uid}/messages`, {
      text: text
    }).map(this.extractData);
  }

  getMessages(chat_id: number) {
    return this.http.get(apiHostUrl + `/${chat_id}/messages`)
      .map(this.extractData);
  }
}
