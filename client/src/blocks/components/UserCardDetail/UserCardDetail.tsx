import './UserCardDetail.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { IUser } from '../../../types/api.types'
interface IProps {
  user: IUser
}

const formatNumbers = (n: number) => {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n
}

export const UserCardDetail: FC<IProps> = ({ user }) => {
  const { t } = useTranslation()
  return (
    <section className="user-card-detail" aria-label={t('aria_card_of_user')}>
      <div className="user-card-detail__img-wr">
        <img className="user-card-detail__img" src={user.avatar_url} alt={`${t('alt_profile_photo')} ${user.login}`} />
      </div>
      <div className="user-card-detail__content" aria-label={t('aria_user_profile_description')}>
        <h2 className="user-card-detail__name">
          {user.name ? `${user?.name}, ` : ''}
          <span className="user-card-detail__nikname">{user.login}</span>
        </h2>
        <p className="user-card-detail__stats">
          <span className="user-card-detail__stats-value">{formatNumbers(user.followers)}</span>{' '}
          {t('users_profile_page_followers', { count: user.followers })} ·{' '}
          <span className="user-card-detail__stats-value">{formatNumbers(user.following)}</span>{' '}
          {t('users_profile_page_following', { count: user.following })}
          {user.blog && (
            <>
              <span> · </span>
              <a href={user.blog} className="user-card-detail__link-repository" target="_blank" rel="noreferrer">
                {user.blog}
              </a>
            </>
          )}
        </p>
      </div>
    </section>
  )
}
