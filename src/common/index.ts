// 全局注入
import injectUtils from './utils'
import injectHttp from './http'

export const injectGlobal = () => {
  injectUtils()
  injectHttp()
}
