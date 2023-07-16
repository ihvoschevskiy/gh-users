import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Loading } from '../../blocks/components/Loading/Loading'
import { UsersList } from '../../blocks/layouts/UsersList/UsersList'
import { getUsers } from '../../data/fetches/fetch'
import { IUser } from '../../types/api.types'

export const UsersSearchPage: FC = () => {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('query'))
  const [isLoading, setIsLoading] = React.useState(true)
  const [users, setUsers] = React.useState<IUser[]>([])
  const { t } = useTranslation()

  React.useEffect(() => {
    setIsLoading(true)
    setQuery(searchParams.get('query'))
  }, [searchParams])

  React.useEffect(() => {
    if (query)
      getUsers(query)
        .then(setUsers)
        .then(() => setIsLoading(false))
  }, [query])

  if (isLoading) return <Loading />

  return (
    <main className="github_users" aria-label={t('aria_list_of_users')}>
      <div className="grid">
        <div className="container">
          <h1 className="title">
            {users.length ? `${t('users_search_page_found')} ${query}` : `${t('users_search_page_not_found')} ${query}`}
          </h1>
          <UsersList foundUsers={users} />
        </div>
      </div>
    </main>
  )
}
