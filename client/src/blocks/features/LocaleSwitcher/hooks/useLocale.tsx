import React, { useEffect } from 'react'
import { Locale } from '../@types/types'
import { applyLocale, getSavedLocale } from '../utils/localSwitcher.utils'

export const useLocale = (): [Locale, React.Dispatch<Locale>] => {
  const [locale, setLocale] = React.useState(getSavedLocale())

  useEffect(() => {
    applyLocale(locale)
  }, [locale])

  return [locale, setLocale]
}
