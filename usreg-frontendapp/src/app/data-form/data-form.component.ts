import { Component, EventEmitter, Input, NgModule, Output,OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IUser,User } from '../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit, OnChanges{
  
  //user data which has to be edited
  @Input() user_to_edit: IUser | null = null;
  
  @Output() form_opened = new EventEmitter<boolean>();
  
  // form fields
  form:FormGroup;
  first_name:string;
  last_name:string;
  email:string;
  roles:string[];
  status:string;

  rolesOptions: string[] = ['Administrator', 'User', 'Mainuser'];
  statusOptions: string[] = ['Active', 'Inactive'];

  ngOnInit(){
    this.form = new FormGroup({
      first_name : new FormControl("",Validators.required),
      last_name : new FormControl("",Validators.required),
      email : new FormControl("",Validators.required),
      roles : new FormControl([""],Validators.required),
      status : new FormControl("",Validators.required),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(`change: ${changes['prop']}`)
    for (let propName in changes){
      let change = changes[propName]
      if (propName === 'user_to_edit' && change.currentValue){
        //user_to_edit was updated
        this.form.patchValue(change.currentValue)
        // console.log(`current change value ${JSON.stringify(change.currentValue)}`)
        // console.log(`current form value ${JSON.stringify(this.form.value)}`)
      }
    }
  }

  onCancelClick() {
    this.form.reset()
    this.form_opened.emit(false);
  }

  onSaveClick(event: Event) {
    // let current_form_value = this.form.value;
    // this.form.reset()
    if(this.user_to_edit){
      console.log(`edited from ${JSON.stringify(this.user_to_edit)} to ${JSON.stringify(this.form.value)}`)
    }else{
      console.log(`saving new user ${JSON.stringify(this.form.value)}`)
    }
    // this.onCancelClick()
  }

  // onCancelButtonClick(){

  // }

}



