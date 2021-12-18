/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const $store: any
declare module '*.json'

declare const CryptoJS: any
declare const NProgress: any
