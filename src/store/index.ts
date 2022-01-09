const path = require('path')

import { createStore } from 'vuex'
import { IRootState } from './types'

const modules = {}
const files = require.context('./modules', true, /index\.ts$/)
files.keys().forEach((key) => {
  const name = path.basename(key.replace('/index.ts', ''))
  modules[name] = files(key).default || files(key)
})

const store = createStore<IRootState>({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules
})

export default store
