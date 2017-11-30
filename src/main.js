// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, {
  QTabs,
  QTab,
  QTabPane,
  QInfiniteScroll,
  QChip,
  QSpinnerDots,
  QModal,
  QBtn,
  QList,
  QItem,
  QItemSide,
  QItemMain,
  QInput,
  TouchSwipe
} from 'quasar'
import { router } from './router'
import { store } from 'store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.use(Quasar, {
  components: {
    QTabs,
    QTab,
    QTabPane,
    QInfiniteScroll,
    QChip,
    QSpinnerDots,
    QModal,
    QBtn,
    QList,
    QItemSide,
    QItemMain,
    QInput,
    QItem
  },
  directives: {
    TouchSwipe
  }
})

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App').default)
  })
})
