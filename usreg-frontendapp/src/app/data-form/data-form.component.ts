import { Component, EventEmitter, Input, NgModule, Output, } from '@angular/core';
import { IUser } from '../models/user';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {

  //user data which has to be edited
  @Input() user_to_edit:IUser|null = null;

  @Output() form_opened = new EventEmitter<boolean>();

  onClick(){
    this.form_opened.emit(false);
  }

  // onCancelButtonClick(){

  // }

}
