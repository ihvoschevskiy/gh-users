import './SearchForm.css'
import React, { FC, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const SearchForm: FC = () => {
  const [searchValue, setSearchValue] = React.useState('')
  const [query, setQuery] = React.useState<string | null>(null)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  React.useEffect(() => {
    setQuery(searchParams.get('query'))
  }, [searchParams])

  React.useEffect(() => {
    query ? setSearchValue(query) : setSearchValue('')
  }, [query])

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!searchValue.trim().length) return

    navigate({
      pathname: '/search',
      search: `query=${searchValue}`,
    })
  }
  return (
    <div className="form-wr">
      <form onSubmit={onSubmit} className="form" aria-label={t('aria_form_of_searching')}>
        <input
          type="search"
          autoFocus={true}
          className="form__input"
          placeholder={t('header_input_placeholder')}
          value={searchValue}
          onChange={e => setSearchValue(e.currentTarget.value)}
        />
        <button type="submit" className="form__button">
          {t('header_search_btn')}
        </button>
      </form>
    </div>
  )
}
