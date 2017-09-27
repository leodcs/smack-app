import { Injectable } from '@angular/core';
import { BaseProvider } from "./base.provider";
import { Http } from "@angular/http";
import { apiHostUrl } from "../environment";
import { AuthService } from "./auth.service";

@Injectable()
export class ChatProvider extends BaseProvider {
  resourceUrl:string = apiHostUrl + "/chats";

  constructor(private http: Http,
              private authService: AuthService) {
    super();
  }

  createChat(firstUserUid:string, secondUserUid:string) {
    return this.http.post(this.resourceUrl,
      {
        "chat": {
          "chat_users_attributes":
            [
              {
                "user_uid": firstUserUid
              },
              {
                "user_uid": secondUserUid
              }
            ]
        }
      }
    ).map(this.extractData);
  }

  findChat(firstUserUid:string, secondUserUid:string) {
    return this.http.get(this.resourceUrl + `/${firstUserUid}/${secondUserUid}`)
      .map(this.extractData);
  }

  getChats() {
    return this.http.get(`${apiHostUrl}/${this.authService.currentUser.uid}/chats`)
      .map(this.extractData)
  }
  //
  // updateLastMessage(text:string, uuid1:string, uuid2:string){
  //   this.getDeepChat(uuid1, uuid2)
  //     .subscribe(() => {
  //       this.database.object(`/chats/${uuid1}/${uuid2}`)
  //         .update({ lastMessage: text });
  //     });
  // }
}
