import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-data-form-activation-button',
  templateUrl: './data-form-activation-button.component.html',
  styleUrls: ['./data-form-activation-button.component.css']
})

export class DataFormActivationButtonComponent {
  @Output() form_opened = new EventEmitter<boolean>();

  onClick(){
    this.form_opened.emit(true);
  }
}