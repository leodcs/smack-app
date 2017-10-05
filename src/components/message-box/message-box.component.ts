import { Component, Input } from '@angular/core';
import { Message } from "../../models/message.model";
import { AuthProvider } from "../../providers/auth.provider";

@Component({
  selector: 'message-box',
  templateUrl: 'message-box.component.html',
  host: {
    '[style.justify-content]': '((messageIsFromCurrentUser()) ? "flex-end" : "flex-start")',
    '[style.text-align]': '((messageIsFromCurrentUser()) ? "right" : "left")'
  }
})
export class MessageBoxComponent {
  @Input() message: Message;

  constructor(private authProvider: AuthProvider) {}

  getMessageClass() {
    if (this.messageIsFromCurrentUser()) {
      return('sender-message')
    }
  }

  messageIsFromCurrentUser() {
    return(this.message.userId == this.authProvider.currentUser.id);
  }
}
