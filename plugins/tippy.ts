import VueTippy from 'vue-tippy'
import 'virtual:svg-icons-register'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    directive: 'tippy',
    component: 'tippy',
  })
})
