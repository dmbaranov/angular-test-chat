import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.scss']
})
export class NewMessageComponent implements OnInit {
  @Output() sendMessage: EventEmitter<string> = new EventEmitter<string>();
  messageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.messageForm = fb.group({
      message: ''
    });
  }

  ngOnInit() {}

  onMessageFormSubmit(msg: string): void {
    this.sendMessage.emit(msg);
  }
}
