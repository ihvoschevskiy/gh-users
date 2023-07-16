import './NotFoundPage.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const NotFoundPage: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="container">
        <section className="not-found">
          <h1 className="title not-found__title">404</h1>
          <p className="not-found__description">{t('not_found_page_message')}</p>
        </section>
      </div>
    </>
  )
}
