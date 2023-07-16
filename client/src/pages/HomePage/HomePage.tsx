import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Loading } from '../../blocks/components/Loading/Loading'
import { UsersList } from '../../blocks/layouts/UsersList/UsersList'

interface IProps {
  isLoading: boolean
}

export const HomePage: FC<IProps> = ({ isLoading }) => {
  const { t } = useTranslation()

  if (isLoading) return <Loading />

  return (
    <main className="github-users" aria-label={t('aria_list_of_users')}>
      <div className="grid">
        <div className="container">
          <UsersList />
        </div>
      </div>
    </main>
  )
}
