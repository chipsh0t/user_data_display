import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  @Output() form_opened = new EventEmitter<boolean>();

  onClick(){
    this.form_opened.emit(false);
  }
}
