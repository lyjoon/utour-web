import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.config.productionTip = false

require('@/assets/css/variable.scss')
require('@/assets/css/style.scss')
require('@/assets/css/app.scss')

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify
  /*vuetify:{
    customVariables: ['~/assets/css/variable.scss']
  }*/
}).$mount('#app')
