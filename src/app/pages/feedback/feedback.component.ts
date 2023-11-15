import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {TelegramService} from "../../services/telegram.service";

@Component({
  selector: 'app-feedback',
  standalone: true,
  template: `
    <form>
      <h2>Feedback form</h2>
      <textarea [value]="feedback()" (input)="handleChange($event)"></textarea>
    </form>
  `,
})
export class FeedbackComponent implements OnInit, OnDestroy{
  feedback = signal('');

  constructor(private telegram: TelegramService) {
    this.sendData = this.sendData.bind(this);
  }

  handleChange(e) {
    this.feedback.set(e.target.value)

    if (this.feedback().trim()) {
      this.telegram.MainButton.enable();
    } else {
      this.telegram.MainButton.disable();
    }
  }

  ngOnInit(): void {
    this.telegram.MainButton.setText('Отправить сообщение')
    this.telegram.MainButton.show();
    this.telegram.MainButton.disable();
    this.telegram.MainButton.onClick(this.sendData)
  }

  ngOnDestroy(): void {
    this.telegram.MainButton.offClick(this.sendData)
  }

  sendData() {
    this.telegram.sendData({ feedback: this.feedback() })
  }
}
