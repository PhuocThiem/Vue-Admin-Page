import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import Vuelidate from 'vuelidate'
import lodash from './mixin/lodash'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
Vue.use(Vuelidate)

const mixins = [lodash]
mixins.forEach(mixin => Vue.mixin(mixin))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
