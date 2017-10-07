import { Injectable } from '@angular/core';
import { BaseProvider } from "./base.provider";
import { TokenService } from "./token.service";
import { User } from "../models/user.model";

@Injectable()
export class ChatProvider extends BaseProvider {
  resourceUrl:string = "/api/chats";

  constructor(private tokenService: TokenService) {
    super();
  }

  createChatWith(recipientUser:User) {
    return this.tokenService._service.post(this.resourceUrl,
      {
        "chat": {
          "chat_users_attributes":
            [
              {
                "user_id": this.tokenService._service.currentUserData.id
              },
              {
                "user_id": recipientUser.id
              }
            ]
        }
      }
    ).map(this.extractData);
  }

  findChatWith(recipientUser: User) {
    return this.tokenService._service.get(this.resourceUrl + `/${recipientUser.id}`)
      .map(this.extractData);
  }

  getChats() {
    return this.tokenService._service.get(this.resourceUrl)
      .map(this.extractData)
  }
}
