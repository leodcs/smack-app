import { User } from "./user.model";

export class Chat {
  constructor(public id: number,
              public title: string,
              public lastMessage: string,
              public createdAt:string,
              public users: User[]) {
  }
}
