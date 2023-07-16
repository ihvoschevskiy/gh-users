import './RepositoryCard.css'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { IRepository } from '../../../types/api.types'

interface IProps {
  repository: IRepository
}

export const RepositoryCard: FC<IProps> = ({ repository }) => {
  const { t } = useTranslation()
  return (
    <div className="repository" aria-label={t('aria_repository_info')}>
      <h2 className="repository__title">
        <a href={repository.html_url} target="_blank" rel="noreferrer" className="repository__link">
          {repository.name}
        </a>
      </h2>
      <p className="repository__description">{repository.description}</p>
    </div>
  )
}
