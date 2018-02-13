import { Component, OnInit, AfterViewChecked, Input, ElementRef } from '@angular/core';
import { IMessage } from '@models/message.model';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss']
})
export class MessagesListComponent implements OnInit, AfterViewChecked {
  @Input() messages: IMessage[] = [];

  constructor(private el: ElementRef) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.el.nativeElement.querySelector('.messages-list').scrollIntoView(false);
  }
}
