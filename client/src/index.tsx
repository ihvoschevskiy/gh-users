import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import { initI18n } from './blocks/features/LocaleSwitcher/utils/localSwitcher.utils'
import { store } from './data/store/app.store'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('root element not found')
const root = createRoot(rootElement)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/sw.js')
      .then(function () {
        console.log('Service Worker Registered!!')
      })
      .catch(error => {
        console.error('cant register SW', error)
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
