import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { App } from './App'
import { initI18n } from './blocks/features/LocaleSwitcher/utils/localSwitcher.utils'

const rootElement = document.getElementById('root')

if (!rootElement) throw new Error('root element not found')
const root = createRoot(rootElement)


initI18n(() => {
  root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
  )
})
