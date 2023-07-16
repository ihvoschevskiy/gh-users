import './LocaleSwitcherButton.css'
import cn from 'classnames'
import React, { ForwardedRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Locale } from '../@types/types'
import { ArrowIco } from './ArrowIco'

interface ILocaleSwitcherButton {
  locale: Locale
  opened?: boolean
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}
export const LocaleSwitcherButton = React.forwardRef(function LocaleSwitcherButton(
  props: ILocaleSwitcherButton,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { t } = useTranslation()
  return (
    <button
      className={cn('locale-switcher-btn', { 'locale-switcher-btn--opened': props.opened })}
      ref={ref}
      onClick={props.onClick}
      aria-label={t('aria_layout_switcher')}
    >
      <span className="locale-switcher-btn__text">
        {props.locale === 'en' && 'EN'}
        {props.locale === 'ru' && 'RU'}
      </span>
      <span className="locale-switcher-btn__icon">
        <ArrowIco />
      </span>
    </button>
  )
})
