export class Message {
  constructor(public userId: string,
              public text:string,
              public chatId:number,
              public createdAt:string) {}
}
