import './LocaleSwitcherMenu.css'
import cn from 'classnames'
import React, { FC } from 'react'
import { Locale } from '../@types/types'

interface ILocaleSwitcherMenu {
  selectedLocale: Locale
  className?: string
  onChangeLocale: (locale: Locale) => void
}

export const LocaleSwitcherMenu: FC<ILocaleSwitcherMenu> = ({ selectedLocale, className, onChangeLocale }) => {
  return (
    <div className={cn('locale-switcher-menu', className)}>
      <button
        className={cn('locale-switcher-menu__option', {
          'locale-switcher-menu__option--active': selectedLocale === Locale.ru,
        })}
        onClick={() => onChangeLocale(Locale.ru)}
      >
        <span className="locale-switcher-menu__text">Русский</span>
      </button>
      <button
        className={cn('locale-switcher-menu__option', {
          'locale-switcher-menu__option--active': selectedLocale === Locale.en,
        })}
        onClick={() => onChangeLocale(Locale.en)}
      >
        <span className="locale-switcher-menu__text">English</span>
      </button>
    </div>
  )
}
