// 环境配置
const appId = 102 //sso登录服务的appid，传0表示走老的授权登录
const appVersion = 1 //sso登录服务的版本，默认为第一版
const logFlag = {
  dev: false, // 开发和测试环境是否上报log
  from: false, // 是否上传页面来源
  packageName: 'vue3-basic'
}

const isDevEnv = process.env.NODE_ENV == 'development'
const devBasePath = 'http://192.168.100.230:10999'
const prodBasePath = 'http://192.168.100.230:10999'
const basePath = isDevEnv ? devBasePath : prodBasePath // api请求地址
const socketPath = 'ws://192.168.100.230:10999/socket' // socket请求地址
const ssoPath = 'https://sso.51yund.com' // 授权登录地址
const localPath = 'https://51yund.com' // 获取定位地址
const logPath = 'https://api.51yund.com' // 上传日志地址
const jumpPath = 'https://d.51yund.com' // 跳转登录地址
const filterErr = ['sskey过期'] //过滤掉某些错不上报

export {
  basePath,
  ssoPath,
  localPath,
  jumpPath,
  logPath,
  logFlag,
  appId,
  appVersion,
  filterErr,
  socketPath
}
