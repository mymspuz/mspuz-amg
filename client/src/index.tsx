import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import MainRouter from './main/routes/router'
import { store } from './store'
import './assets/scss/style.scss'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <MainRouter />
      </Provider>
  </React.StrictMode>
)