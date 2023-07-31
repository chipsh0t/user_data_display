import { Component, EventEmitter, Inject, Injectable, Output} from '@angular/core';
import { NgIf } from '@angular/common';
import { IUser } from '../models/user';
import {MatDialog,MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.css']
})

export class DeleteUserDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:IUser){}
}
