import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  is_active: boolean;
}


const users: User[] = [
  {id: 1234556, email: "test@example.com", firstName: "test", lastName: "test", createdAt: new Date, is_active: true },
  {id: 1234456, email: "test2@example.com", firstName: "test2", lastName: "test2", createdAt: new Date, is_active: true}
]


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _users: BehaviorSubject<User[]> = new BehaviorSubject(users)
  public users: Observable<User[]>
  constructor() {
    this.users = this._users.asObservable()
   }

   getUsers(): Observable<User[]> {
     return this._users
   }

   dispatchUsers(user: any) {
    
    let users = this._users.getValue()
    // console.log(users)
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == user.id) {
        user.createdAt = users[i].createdAt
        users[i] = user
      }
    }
    this._users.next(users)
    // console.log(this._users.getValue())
   }

   getUserById(id: number) {
    return this._users.getValue().filter(user => user.id == id)[0]
   }


}
