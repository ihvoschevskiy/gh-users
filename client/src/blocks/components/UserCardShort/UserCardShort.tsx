import './UserCardShort.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Dispatch } from '../../../data/store/app.store'
import { setUser } from '../../../data/store/users.slice'
import { IUser } from '../../../types/api.types'

interface IProps {
  user: IUser
}

export const UserCardShort: FC<IProps> = ({ user }) => {
  const dispatch = useDispatch<Dispatch>()
  const { t } = useTranslation()
  return (
    <div className="user-card-short" aria-label={t('aria_card_of_user')}>
      <div className="user-card-short__img-wr">
        <img className="user-card-short__img" src={user.avatar_url} alt={`${t('alt_profile_photo')} ${user.login}`} />
      </div>
      <div className="user-card-short__content">
        <h2 className="user-card-short__nikname">
          <Link
            to={`/users/${user.login}`}
            className="user-card-short__link"
            onClick={() => {
              dispatch(setUser(user))
            }}
          >
            {user.login}
          </Link>
        </h2>
        <p className="user-card-short__repositories">{t('users_list_repos', { count: user.public_repos })}</p>
        <p className="user-card-short__organization">{user.organization ? user.organization : <br />}</p>
      </div>
    </div>
  )
}
