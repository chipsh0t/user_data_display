import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { BooleanInput } from '@angular/cdk/coercion';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'usreg-frontendapp';
  form_opened:boolean=false;
  
  onFormOpened(opened:boolean){
    this.form_opened=opened;
  }
}
