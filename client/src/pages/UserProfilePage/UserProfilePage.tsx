import './UserProfilePage.css'
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Loading } from '../../blocks/components/Loading/Loading'
import { RepositoryCard } from '../../blocks/components/RepositoryCard/RepositoryCard'
import { UserCardDetail } from '../../blocks/components/UserCardDetail/UserCardDetail'
import { getRepositories, getUserById } from '../../data/fetches/fetch'
import { selectUser } from '../../data/store/users.slice'
import { IRepository, IUser } from '../../types/api.types'

export const UserProfilePage: FC = () => {
  const [user, setUser] = React.useState<IUser | null>(useSelector(selectUser))
  const [isLoading, setIsloading] = React.useState(false)
  const [repositories, setRepositories] = React.useState<IRepository[]>([])
  const [error, setError] = React.useState(false)
  const { id }: { id?: string } = useParams()
  const { t } = useTranslation()

  React.useEffect(() => {
    setIsloading(true)
    if (!user && id) {
      getUserById(id)
        .then(setUser)
        .catch(() => setError(true))
    }
  }, [])

  React.useEffect(() => {
    setIsloading(false)
    if (user) {
      getRepositories(user.login).then(setRepositories)
    }
  }, [user])

  if (isLoading) return <Loading />
  if (error) return <NotFoundPage />

  return (
    <>
      {!isLoading && user && (
        <section className="user__profile" aria-label={t('aria_user_page')}>
          <div className="grid">
            <div className="container">
              <UserCardDetail user={user} />
              <section className="repositories" aria-label={t('aria_list_of_repositories')}>
                <div className="repositories__header">
                  <h2 className="repositories__title">{t('users_profile_page_repos')}</h2>
                  <a
                    href={`https://github.com/${user.login}?tab=repositories`}
                    target="_blank"
                    rel="noreferrer"
                    className="repositories__link"
                  >
                    {t('users_profile_page_repos_link')}
                  </a>
                </div>
                <div className="repositories-list-wr">
                  {repositories.map((item, index) => (
                    <RepositoryCard key={index} repository={item} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
