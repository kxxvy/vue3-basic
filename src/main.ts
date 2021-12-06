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

//全局注入
injectGlobal()

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')
