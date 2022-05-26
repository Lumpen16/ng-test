import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../table/table.component';
import { set } from '../users.actions'
import 'rxjs/Rx'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  form: FormGroup
  // firstName: string 
  // lastName: string
  // email: string 
  // is_active: boolean
  firstname = new FormControl(`${this.data.firstname}`)
  lastname = new FormControl(`${this.data.lastname}`)
  email = new FormControl(`${this.data.email}`)
  is_active = new FormControl(`${this.data.is_active}`)
  
  users$!: Observable<User[]>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private store: Store<{users: any}>, 
    public dialogRef: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder

    ) { 
    // this.firstName = data.firstName
    // this.lastName = data.lastName
    // this.email = data.email
    // this.is_active = data.is_active
    this.form = fb.group({
      'firstname': this.firstname,
      'lastname': this.lastname,
      'email': this.email,
      'is_active': this.is_active
    })
  }

  ngOnInit(): void {
    console.log(this.data)
  }

  changeData(type: string, event: any) {
    switch(type) {
      case 'firstName': this.firstname = event.target.value; break;
      case 'lastName': this.lastname = event.target.value;break;
      case 'email': this.email = event.target.value;break;
      case 'is_active': this.is_active = event.target.value
    }
  } 

  save() {
    if (!this.email) {
      this.snackBar.open('Field email can`t be empty', 'Undo', {duration: 3000})
      console.log('bruh')
    }
    else if (this.firstname.length > 100 || this.lastname.length > 100) {
      this.snackBar.open('Max length of fields firstname and lastname is 100 characters', 'Undo', {duration: 3000})
      console.log('bruh2')
    }
    else {
      this.data.firstName = this.firstname
      this.data.lastName = this.lastname
      this.data.is_active = this.is_active
      this.data.email = this.email
      this.dialogRef.close()
    }
    
  }

}
