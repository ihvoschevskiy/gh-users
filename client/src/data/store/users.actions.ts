import { IUser } from '../../types/api.types'
import { getUsers } from '../fetches/fetch'
import { AppAction } from './app.store'
import { setUsers } from './users.slice'

export const fetchUsers = (): AppAction<Promise<void>> => async dispatch => {
  const users: IUser[] = await getUsers()
  dispatch(setUsers(users))
}
