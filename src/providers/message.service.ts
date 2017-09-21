import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { BaseService } from "./base.service";
import { Message } from "../models/message.model";
import * as firebase from "firebase/app";
import { ChatService } from "./chat.service";

@Injectable()
export class MessageService extends BaseService {
  constructor(public database: AngularFireDatabase,
              private chatService: ChatService) {
    super();
  }

  create(text:string, uuid1:string, uuid2:string) {
    const message = new Message(uuid1, text, firebase.database.ServerValue.TIMESTAMP);
    const dbListOriginalOrder = this.dbList(`/messages/${uuid1}-${uuid2}`);
    const inverseOrder = `/messages/${uuid2}-${uuid1}`;
    if ( dbListOriginalOrder ) {
      dbListOriginalOrder.push(message);
      this.chatService.updateLastMessage(text, uuid1, uuid2);
    }else {
      this.dbList(inverseOrder).push(message);
      this.chatService.updateLastMessage(text, uuid2, uuid1);
    }
  }

  getMessages(firstUserId:string, secondUserId:string) {
    return this.database.list(`/messages/${firstUserId}-${secondUserId}`, {
      query: {
        orderByChild: 'timestamp'
      }
    }).catch(this.handleObservableError);
  }

  private dbList(path:string) {
    return this.database.list(path);
  }
}
