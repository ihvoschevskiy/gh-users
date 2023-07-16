import './Header.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { SearchForm } from '../../components/SearchForm/SearchForm'
import { LocaleSwitcher } from '../../features/LocaleSwitcher/components/LocaleSwitcher'

export const Header: FC = () => {
  const [page, setPage] = React.useState<'users' | 'user' | 'search'>('users')
  const [nikname, setNikname] = React.useState('')
  const location = useLocation()
  const { t } = useTranslation()

  React.useEffect(() => {
    let found
    const userReg = new RegExp('^/users/([a-zd](?:[a-zd]|-(?=[a-zd])){0,38})$', 'i')
    const searchReg = new RegExp('^/search/?$')

    switch (true) {
      case searchReg.test(location.pathname):
        setPage('search')
        break
      case userReg.test(location.pathname):
        found = location.pathname.match(userReg)
        if (found) setNikname(found[1])
        setPage('user')
        break
      default:
        setPage('users')
    }
  }, [location])

  return (
    <div className="grid">
      <div className="container">
        <header className="header">
          <nav className="header__navigation navigation">
            <Link to="/" className="navigation__link" aria-label={t('aria_home') as string}>
              {t('header')}
            </Link>
            <span className="navigation__caption">
              {page === 'user' && ` // ${nikname}`}
              {page === 'search' && ` // ${t('header_search_caption')}`}
            </span>
          </nav>
          <div className="header__controls">
            <LocaleSwitcher />
            <SearchForm />
          </div>
        </header>
      </div>
    </div>
  )
}
