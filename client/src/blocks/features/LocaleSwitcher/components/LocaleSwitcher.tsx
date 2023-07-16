import React, { FC } from 'react'
import { Dropdown } from '../../../components/Dropdown/Dropdown'
import { useLocale } from '../hooks/useLocale'
import { LocaleSwitcherButton } from './LocaleSwitcherButton'
import { LocaleSwitcherMenu } from './LocaleSwitcherMenu'

export const LocaleSwitcher: FC = () => {
  const [dropdownShown, setDropdownShown] = React.useState(false)
  const target = React.useRef<HTMLButtonElement>(null)
  const [locale, setLocale] = useLocale()

  return (
    <div className="locale-switcher">
      <LocaleSwitcherButton
        onClick={e => {
          e.stopPropagation()
          setDropdownShown(!dropdownShown)
        }}
        ref={target}
        locale={locale}
        opened={dropdownShown}
      />
      <Dropdown shown={dropdownShown} onShownToggle={setDropdownShown} target={target}>
        <LocaleSwitcherMenu
          className="locale-switcher__dropdown-menu"
          selectedLocale={locale}
          onChangeLocale={locale => setLocale(locale)}
        />
      </Dropdown>
    </div>
  )
}
