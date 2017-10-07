import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BaseProvider } from "./base.provider";
import { TokenService } from "./token.service";

@Injectable()
export class MessageProvider extends BaseProvider {
  constructor(private tokenService: TokenService) {
    super();
  }

  create(text: string, sender_uid: string, chat_id: number) {
    return this.tokenService._service.post(`/api/chats/${chat_id}/messages`, {
      text: text
    }).map(this.extractData);
  }

  getMessages(chat_id: number) {
    return this.tokenService._service.get(`/api/chats/${chat_id}/messages`)
      .map(this.extractData);
  }

  updateMessage(chat_id:number, message_id: number) {
    return this.tokenService._service.patch(`/api/chats/${chat_id}/messages/${message_id}`, {
      read: true
    }).map(this.extractData);
  }
}
