import { Component, EventEmitter, Input, NgModule, Output,OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { IUser } from '../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserDataService } from '../services/user-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit, OnChanges, OnDestroy{
  
  //user data which has to be edited
  @Input() user_to_edit: IUser | null = null;
  
  @Output() form_opened = new EventEmitter<boolean>();
  
  private subs  = new Subscription();

  // form fields
  form:FormGroup;
  firstName:string;
  lastName:string;
  email:string;
  roles:string[];
  status:string;

  rolesOptions: string[];
  statusOptions: string[];

  constructor(private _userDataService:UserDataService){ }

  ngOnInit(){
    this.form = new FormGroup({
      firstName : new FormControl("",Validators.required),
      lastName : new FormControl("",Validators.required),
      email : new FormControl("",Validators.required),
      roles : new FormControl([""],Validators.required),
      status : new FormControl("",Validators.required),
    });

    //load user roles and statuses
    this.subs.add(this._userDataService.getUserRoles().subscribe(
      (roles)=>{
        this.rolesOptions = roles;
      }
    ));

    this.subs.add(this._userDataService.getUserStatuses().subscribe(
      (statuses)=>{
        this.statusOptions = statuses;
      }
    ));
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes){
      let change = changes[propName]
      if (propName === 'user_to_edit' && change.currentValue){
        //user_to_edit was updated
        this.form.patchValue(change.currentValue)
      }
    }
  }

  onCancelClick() {
    this.form.reset();
    this.form_opened.emit(false);
  }
  
  onSaveClick(event: Event) {
    if(this.user_to_edit){
      let user_data_passed:IUser = {id:this.user_to_edit.id, ...this.form.value}; 
      this.subs.add(this._userDataService.updateUser(user_data_passed).subscribe(
        (value)=>{
          this._userDataService.edit_user_subject.next(value);
        }
      ));
    }else{
      //save user in db
      this.subs.add(this._userDataService.addNewUser(this.form.value).subscribe(
        (new_user)=>{
          //send new user to table
          this._userDataService.save_user_subject.next(new_user);
        }
      ))
    }
    this.onCancelClick()
  }


  ngOnDestroy(): void {
    if(this.subs){this.subs.unsubscribe()}
  }
}



