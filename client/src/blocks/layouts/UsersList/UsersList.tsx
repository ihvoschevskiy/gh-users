import './UsersList.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectUsers } from '../../../data/store/users.slice'
import { IUser } from '../../../types/api.types'
import { UserCardShort } from '../../components/UserCardShort/UserCardShort'

interface IProps {
  foundUsers?: IUser[]
}

export const UsersList: FC<IProps> = ({ foundUsers }) => {
  const [users, setUsers] = React.useState<IUser[]>([])
  const stored: IUser[] = useSelector(selectUsers)
  const { t } = useTranslation()

  React.useEffect(() => {
    foundUsers ? setUsers(foundUsers) : setUsers(stored)
  }, [])

  return (
    <div className="users-list">
      {users.map((item, index) => (
        <UserCardShort key={index} user={item} aria-label={t('aria_card_of_user')} />
      ))}
    </div>
  )
}
