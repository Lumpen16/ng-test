import { createAction, props } from '@ngrx/store'

export const set = createAction('[Table Component] Set', props<{user: any}>())