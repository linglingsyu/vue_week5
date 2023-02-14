import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


import { defineRule, configure } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import tw from '@vee-validate/i18n/dist/locale/zh_TW.json'

configure({
  generateMessage: localize({
    zh_TW: tw,
  }),
})
setLocale('zh_TW')

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

import 'bootstrap' // 從nodeModule中載入Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css' // Import css file
// import './style.css'

const app = createApp(App)
app.component('Loading',Loading)
app.use(router).use(pinia).mount('#app')
