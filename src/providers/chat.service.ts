import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { Chat } from "../models/chat.model";
import { AngularFireDatabase } from "angularfire2/database";
import { AuthService } from "./auth.service";

@Injectable()
export class ChatService extends BaseService {

  constructor(public database: AngularFireDatabase,
              public authService: AuthService) {
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

  getChats() {
    return this.database.list('/chats/'+this.authService.currentUser.uid, {
      query: {
        orderByChild: 'timestamp'
      }
    }).map((chats: Chat[])=>{
      return chats.reverse();
    }).catch(this.handlePromiseError)
  }

  updateLastMessage(text:string, uuid1:string, uuid2:string){
    this.getDeepChat(uuid1, uuid2)
      .subscribe(() => {
        this.database.object(`/chats/${uuid1}/${uuid2}`)
          .update({ lastMessage: text });
      });
  }
}
