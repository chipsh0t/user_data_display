import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BooleanInput } from '@angular/cdk/coercion';
import { IUser } from './models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usreg-frontendapp';
  form_opened:boolean=false;
  user_to_be_edited:IUser|null = null;
  
  
  onFormOpened(opened:boolean){
    this.form_opened=opened;
    this.user_to_be_edited = null;
  }

  onEditFormOpened(opened:boolean){
    this.form_opened=opened;
  }

  onUserDataReceived(user:IUser){
    this.user_to_be_edited = user;
    // console.log(`user to be edited: ${JSON.stringify(this.user_to_be_edited)}`)
  }
}
