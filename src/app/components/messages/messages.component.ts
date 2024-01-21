import { Component, Inject, OnInit } from '@angular/core';
import IDisplayMessages from 'src/app/domain/ports/i-display-messages';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          transform: 'translateX(0)',
        })
      ),
      state(
        'out',
        style({
          transform: 'translateX(100%)',
        })
      ),
      transition('in => out', animate('300ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MessagesComponent implements OnInit {
  isToastVisible = false;

  constructor(
    @Inject('IDisplayMessages') public messagesDisplayer: IDisplayMessages
  ) {}

  ngOnInit() {}
}
