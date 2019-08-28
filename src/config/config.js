import React from 'react'
import Loadable from 'react-loadable'
import getMenuItems from './menuItems'
import LoadingComponent from 'rmw-shell/lib/components/LoadingComponent'
import locales from './locales'
import routes from './routes'
import themes from './themes'
import grants from './grants'

const Loading = () => <LoadingComponent />

const LPAsync = Loadable({
  loader: () => import('../../src/pages/LandingPage'),
  loading: Loading
})

const config = {
  firebase_config: {
    apiKey: 'AIzaSyDIkh6OV5ZxvpHoyhsGmX8tPM81ykAnMv0',
    authDomain: 'djemat-app.firebaseapp.com',
    databaseURL: 'https://djemat-app.firebaseio.com',
    projectId: 'djemat-app',
    storageBucket: 'djemat-app.appspot.com',
    messagingSenderId: '743209498025',
    appId: '1:743209498025:web:c97b5b9d231d3c07'
  },
  firebase_config_dev: {
    apiKey: 'AIzaSyDIkh6OV5ZxvpHoyhsGmX8tPM81ykAnMv0',
    authDomain: 'djemat-app.firebaseapp.com',
    databaseURL: 'https://djemat-app.firebaseio.com',
    projectId: 'djemat-app',
    storageBucket: 'djemat-app.appspot.com',
    messagingSenderId: '743209498025',
    appId: '1:743209498025:web:c97b5b9d231d3c07'
  },
  firebase_providers: ['google.com', 'password'],
  initial_state: {
    themeSource: {
      isNightModeOn: true,
      source: 'default'
    },
    locale: 'bs'
  },
  drawer_width: 256,
  locales,
  themes,
  grants,
  routes,
  getMenuItems,
  firebaseLoad: () => import('./firebase'),
  landingPage: LPAsync
}

export default config
