import { createReducer, on }  from '@ngrx/store'
import { set } from './users.actions'

export const initialState = [
    {id: 1234556, email: "test@example.com", firstName: "test", lastName: "test", createdAt: new Date, is_active: true },
    {id: 1234456, email: "test2@example.com", firstName: "test2", lastName: "test2", createdAt: new Date, is_active: true}
  ]

function updateUsers(state: any, user: any) {
    console.log(state)
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === user.id) {
            state[i] = user[i]
        }
    }
    
    return state
}
 

export const usersReducer = createReducer(
    initialState,
    on(set, (state, smth) => state = updateUsers(state, smth))
)