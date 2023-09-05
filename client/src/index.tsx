import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ILogObj, Logger } from 'tslog'
import { App } from './App'
import { initI18n } from './blocks/features/LocaleSwitcher/utils/localSwitcher.utils'
import { store } from './data/store/app.store'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('root element not found')
const root = createRoot(rootElement)

const logger: Logger<ILogObj> = new Logger()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        logger.info('Service Worker Registered')
      })
      .catch(err => {
        logger.error('Can not register Service Worker', err)
      })
  })
}

initI18n(() => {
  root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  )
})
