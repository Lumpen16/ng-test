import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User, UsersService } from '../users.service';
import { set } from '../users.actions'
// import 'rxjs/Rx'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  // form: FormGroup
  // firstName!: string 
  // lastName!: string
  // email!: string 
  // is_active!: boolean
  id!: number
  form = this.fb.group({
    'firstName': new FormControl('', [Validators.maxLength(100)]),
    'lastName': new FormControl('', [Validators.maxLength(100)]),
    'email': new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
    'is_active': new FormControl(true)

  })
  // firstname = new FormControl(``)
  // lastname = new FormControl(``)
  // email = new FormControl(``, Validators.pattern('[^ @]*@[^ @]*'))
  // is_active = new FormControl(true)
  
  // users$!: Observable<User[]>;
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: any, 
    // private store: Store<{users: any}>, 
    // public dialogRef: MatDialogRef<ModalComponent>,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private usersService: UsersService

    ) { 
     
    // this.firstName = data.firstName
    // this.lastName = data.lastName
    // this.email = data.email
    // this.is_active = data.is_active
    // this.form = fb.group({
    //   'firstname': this.firstname,
    //   'lastname': this.lastname,
    //   'email': this.email,
    //   'is_active': this.is_active
    // })

    // this.form.valueChanges.subscribe(data => console.log(data) )
  }

  ngOnInit(): void {
    
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id'])
      const obj:User = this.usersService.getUserById(this.id)
      this.form.setValue({'firstName': obj.firstName, 'lastName': obj.lastName, 'email': obj.email, 'is_active': obj.is_active})
      // this.firstName = obj.firstName
      // this.lastName = obj.lastName
      // this.email = obj.email
      // this.is_active = obj.is_active
      // console.log(this.firstName, this.lastName, this.email, this.is_active)
    }) 
  }

  // changeData(type: string, event: any) {
  //   switch(type) {
  //     case 'firstName': this.firstName = event.target.value; break;
  //     case 'lastName': this.lastName = event.target.value;break;
  //     case 'email': this.email = event.target.value;break;
  //     case 'is_active': this.is_active = event.target.value
  //   }
  // } 

  // changeValue(event: any) {
  //   switch(event.target.name) {
  //     case 'firstName': this.form.patchValue({'firstName': event.target.value});break;
  //     case 'lastName': this.form.patchValue({'lastName': event.target.value});break;
  //     case 'email': this.form.patchValue({'email': event.target.value});break;
  //     case 'is_active': this.form.patchValue({'is_active': event.target.value})
  //   }
  // }
  save() {
    // console.log(this.form)
    // console.log(this.form.getRawValue())
    if (this.form.invalid) {
      if (this.form.controls['email']) {
        this.snackBar.open('Wrong email`s value', 'Undo', {duration: 3000})
        return
      }
      this.snackBar.open('Max length of fields firstname and lastname is 100 characters', 'Undo', {duration: 3000})
      return
    }
    this.usersService.dispatchUsers({id: this.id, ...this.form.getRawValue()})

    
    
    // if (!this.email || !this.email.match('[^ @]*@[^ @]*')) {
    //   
    //   console.log('bruh')
    // }
    // else if (this.firstName.length > 100 || this.lastName.length > 100) {
    //   this.snackBar.open('Max length of fields firstname and lastname is 100 characters', 'Undo', {duration: 3000})
    //   console.log('bruh2')
    // }
    // else {
    //   let usr = { id: this.id, firstName: this.firstName, lastName: this.lastName, email: this.email, is_active: this.is_active}
    //   this.usersService.dispatchUsers(usr)
    // }
    // else {
    //   // this.data.firstName = this.firstName
    //   // this.data.lastName = this.lastName
    //   // this.data.is_active = this.is_active
    //   // this.data.email = this.email
    //   // this.dialogRef.close()
    // }
    
  }

}
