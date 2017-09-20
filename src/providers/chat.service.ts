import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { Chat } from "../models/chat.model";
import { AngularFireDatabase } from "angularfire2/database";

@Injectable()
export class ChatService extends BaseService {
  constructor(public database: AngularFireDatabase) {
    super();
  }

  create(chat: Chat, firstUserId:string, secondUserId:string) {
    return this.database.object(`/chats/${firstUserId}/${secondUserId}`)
      .set(chat)
      .catch(this.handlePromiseError);
  }

  getDeepChat(firstUserId:string, secondUserId:string) {
    return this.database.object(`/chats/${firstUserId}/${secondUserId}`)
      .catch(this.handlePromiseError);
  }
}
