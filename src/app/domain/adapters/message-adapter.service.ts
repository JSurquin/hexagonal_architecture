import { Injectable } from '@angular/core';
import IManageMessages from '../ports/i-manage-messages';

@Injectable({ providedIn: 'root' })
export class MessageAdapterService implements IManageMessages {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
