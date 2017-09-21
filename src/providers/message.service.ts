import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { BaseService } from "./base.service";
import { Message } from "../models/message.model";
import { AuthService } from "./auth.service";
import * as firebase from "firebase/app";

@Injectable()
export class MessageService extends BaseService {
  constructor(public database: AngularFireDatabase,
              public authService: AuthService) {
    super();
  }

  create(text:string, uuid1:string, uuid2:string) {
    const message = new Message(this.authService.currentUser.uid, text, firebase.database.ServerValue.TIMESTAMP);
    const dbObject = this.database.list(`/messages/${uuid1}-${uuid2}`);
    if ( dbObject ) {
      dbObject.push(message);
    }else {
      this.database.list(`/messages/${uuid2}-${uuid1}`).push(message);
    }
  }

  getMessages(firstUserId:string, secondUserId:string) {
    return this.database.list(`/messages/${firstUserId}-${secondUserId}`, {
      query: {
        orderByChild: 'timestamp'
      }
    }).catch(this.handleObservableError);
  }
}
