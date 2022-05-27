import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModalComponent } from '../modal/modal.component';
import { User, UsersService } from '../users.service';


// export interface User {
//   id: number;
//   email: string;
//   firstName: string;
//   lastName: string;
//   createdAt: Date;
//   is_active: boolean;
// }
  
// const users: User[] = [
//   {id: 1234556, email: "test@example.com", firstName: "test", lastName: "test", createdAt: new Date, is_active: true },
//   {id: 1234456, email: "test2@example.com", firstName: "test2", lastName: "test2", createdAt: new Date, is_active: true}
// ]

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'email', 'firstName', 'lastName', 'createdAt', 'is_active']
  users!: User[]

  userSubscription

  chosenUser!: User
  constructor(
    // public dialog: MatDialog,
    private store: Store<{users: any}>,
    private usersService: UsersService,
    private router: Router) { 
      this.userSubscription = this.usersService.getUsers().subscribe(data => this.users = data)
      console.log(this.users)
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }


  openModal(user: User): void {
    // const dialogRef = this.dialog.open(ModalComponent, {
    //   data: user
    // })
    this.router.navigate(['users', user.id])

  }

} 
