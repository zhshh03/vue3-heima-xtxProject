import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 图片懒加载指令
app.directive('img-lazy', {
  mounted(el, binding) {
  useIntersectionObserver(
  el,
  ([ {isIntersecting }]) => {
    if (isIntersecting) {
      el.src = binding.value
    }
  },
)
  }
})


