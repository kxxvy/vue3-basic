// 全局注入
import injectTool from './tool'
import injectUtils from './utils'
import injectHttp from './http'

export const injectGlobal = () => {
  injectTool()
  injectUtils()
  injectHttp()
}
