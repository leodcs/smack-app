import { User } from "./user.model";

export class Chat {
  constructor(public title: string,
              public users: User[],
              public id?: number,
              public lastMessage?: string,
              public createdAt?:string) {
  }
}
