import { createSlice, PayloadAction } from '@reduxjs/toolkit/'
import { IUser } from '../../types/api.types'
import { RootState } from './app.store'

interface IInitialState {
  list: IUser[]
  selectedUser: IUser | null
}

const initialState: IInitialState = {
  list: [],
  selectedUser: null,
}

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<IUser[]>) => {
      state.list = action.payload
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.selectedUser = action.payload
    },
  },
})

export const selectUsers = (state: RootState) => state.list
export const selectUser = (state: RootState) => state.selectedUser

export const { setUsers, setUser } = slice.actions
export default slice.reducer
