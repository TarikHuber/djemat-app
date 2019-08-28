import en_messages from './en'
import de_messages from './de'
import bs_messages from './bs'
import '@formatjs/intl-relativetimeformat/polyfill'
import '@formatjs/intl-relativetimeformat/dist/locale-data/de'
import '@formatjs/intl-relativetimeformat/dist/locale-data/en'
import '@formatjs/intl-relativetimeformat/dist/locale-data/bs'

const locales = [
  {
    locale: 'en',
    messages: en_messages
  },
  {
    locale: 'de',
    messages: de_messages
  },
  {
    locale: 'bs',
    messages: bs_messages
  }
]

export default locales
