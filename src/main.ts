import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { injectGlobal } from './common'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './style/global.less'
import './style/reset.less'
import './style/common.less'
import eventBus from '@/common/eventBus'

//全局注入
injectGlobal()

const app = createApp(App)
app.config.globalProperties.$eventBus = eventBus

app.use(router).use(store).use(ElementPlus).mount('#app')
