import { Action, configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit'
import usersReducer from './users.slice'

export const store = configureStore({
  reducer: usersReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = ThunkDispatch<RootState, unknown, Action<string>>
export type AppAction<R> = ThunkAction<R, RootState, unknown, Action<string>>
