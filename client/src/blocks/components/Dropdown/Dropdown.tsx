import './Dropdown.css'
import cn from 'classnames'
import { createFocusTrap } from 'focus-trap'
import throttle from 'lodash.throttle'
import React, { FC, HTMLAttributes, RefObject } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

interface IDropdown extends HTMLAttributes<HTMLElement> {
  target: RefObject<HTMLElement>
  shown: boolean
  onShownToggle: (shown: boolean) => void
  children: React.ReactNode
}

const calcCoords = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  const windowWidth = window.innerWidth
  const documentWidth = document.documentElement.offsetWidth
  const scrollBarWidth = windowWidth - documentWidth
  return {
    top: rect.bottom + 4,
    right: windowWidth - rect.right - scrollBarWidth,
  }
}

export const Dropdown: FC<IDropdown> = ({ target, shown, onShownToggle, children, style, className, ...rest }) => {
  const [coords, setCoords] = React.useState({ top: 0, right: 0 })
  const ref = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    setCoords(calcCoords(target.current as HTMLElement))
  }, [])

  React.useEffect(() => {
    const trap = createFocusTrap(ref.current as HTMLDivElement, { allowOutsideClick: true })
    if (shown) {
      trap.activate()
    }

    return () => {
      trap.deactivate()
    }
  }, [shown])

  React.useEffect(() => {
    const documentClickListener = () => {
      onShownToggle(false)
    }

    const documentKeydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onShownToggle(false)
      }
    }

    const windowResizeListener = throttle(() => {
      setCoords(calcCoords(target.current as HTMLElement))
    }, 10)

    window.addEventListener('resize', windowResizeListener)

    if (shown) {
      document.addEventListener('click', documentClickListener)
      document.addEventListener('keydown', documentKeydownListener)
    }
    return () => {
      document.removeEventListener('click', documentClickListener)
      document.removeEventListener('keydown', documentKeydownListener)
      window.removeEventListener('resize', windowResizeListener)
    }
  }, [onShownToggle, shown])

  return createPortal(
    <CSSTransition in={shown} timeout={100} mountOnEnter={true} unmountOnExit={true} classNames="dropdown-animation">
      <div {...rest} ref={ref} className={cn('dropdown', className)} style={{ ...style, ...coords }}>
        {children}
      </div>
    </CSSTransition>,
    document.getElementById('overlay') as HTMLElement,
  )
}
