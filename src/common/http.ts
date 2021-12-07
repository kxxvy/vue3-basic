// 封装axios请求
import qs from 'qs'
import axios, { AxiosRequestConfig } from 'axios'
import router from '../router/index'
// import NProgress from 'nprogress'
// import CryptoJS from 'crypto-js'
import { basePath } from '@/config/env'
import urls from '@/server/urls'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: basePath,
  timeout: 1000 * 10,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const post = async (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, qs.stringify(params))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

const get = (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

const del = (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    instance
      .delete(url, {
        params: params
      })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

const patch = async (url: string, params: any) => {
  return new Promise((resolve, reject) => {
    instance
      .patch(url, qs.stringify(params))
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

const upload = async (url: string, params: any) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve, reject) => {
    instance
      .post(url, params, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        const errRes = err.response
        handleHttpErr(errRes)
        reject(err)
      })
  })
}

instance.interceptors.response.use(
  (config) => {
    NProgress.done()
    return config
  },
  (error) => {
    if (error.message.includes('timeout')) {
      ElMessage.warning('网络超时')
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

instance.interceptors.request.use(async (config: any) => {
  NProgress.start()
  const url = config.url
  const method = config.method.toUpperCase()
  const withParamMethods = ['GET', 'DELETE']
  const methodFlag = withParamMethods.some((item) => item == method)
  const params = methodFlag ? config.params : qs.parse(config.data)
  const curTimeStamp = new Date().getTime() / 1000
  const curDate = window.utils.formatDate(curTimeStamp, 'yyyy-MM-dd hh:mm:ss')
  const authStr = await _hamcShaV2(url, method, params, curDate)
  config.headers['X-Authorization'] = authStr
  config.headers['X-Authorization-Date'] = curDate
  config.headers['Client-Token'] = window.localStorage.getItem('token')
  config.headers['Client-ID'] = window.localStorage.getItem('userId')
  return config
})

export default () => {
  if (typeof window.$http == 'undefined') {
    window.$http = {
      post: post,
      get: get,
      patch: patch,
      delete: del,
      upload: upload
    }
  }
}

function handleHttpErr(errRes: { data: any; config: AxiosRequestConfig<any> }) {
  const errData = errRes.data
  const codeFlag = errData.code
  if (codeFlag == 10103 || codeFlag == 10104) {
    localStorage.removeItem('authKey')
    localStorage.removeItem('authSecret')
    instance(errRes.config)
  } else if (codeFlag == 10122) {
    ElMessage.warning('登录过期，请重新登录')
    localStorage.clear()
    router.replace('/login')
  } else {
    const msg = codeFlag ? errData.message : '请求异常，请稍后重试'
    ElMessage.error(msg)
  }
}

function getAuthorizeInfo() {
  return axios({
    method: 'get',
    url: basePath + urls.auth,
    params: {
      source: 'web'
    }
  })
    .then(function (res) {
      return res
    })
    .catch((res) => {
      location.href =
        'https://ydcommon.51yund.com/circle_html/error_index/errIndex.html'
    })
}
async function _hamcShaV2(
  path: string | undefined,
  method: string,
  params = {},
  datetime: string
) {
  let key: any = localStorage.getItem('authKey')
  let secret: any = localStorage.getItem('authSecret')
  if (!key || !secret) {
    const authInfo: any = await getAuthorizeInfo()
    key = authInfo.data.business_key
    secret = authInfo.data.business_secret
    localStorage.setItem('authKey', key)
    localStorage.setItem('authSecret', secret)
  }
  const sortParamsEncode = decodeURIComponent(changeDataType(ksort(params)))
  const encryptStr =
    path + '|' + method.toUpperCase() + '|' + sortParamsEncode + '|' + datetime
  const digest = CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA256(encryptStr, secret)
  )
  const authStr = `${key} ${digest}`
  return authStr
}
function ksort(unordered: { [x: string]: any }) {
  const ordered = Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
      obj[key] = unordered[key]
      return obj
    }, {})
  return ordered
}
let nextStr = ''
function changeDataType(obj: { [x: string]: any }) {
  let str = ''
  if (typeof obj == 'object') {
    for (const i in obj) {
      if (typeof obj[i] != 'function' && typeof obj[i] != 'object') {
        str += i + '=' + obj[i] + '&'
      } else if (typeof obj[i] == 'object') {
        nextStr = ''
        str += changeSonType(i, obj[i])
      }
    }
  }
  return str.replace(/&$/g, '')
}
function changeSonType(objName: string, objValue: { [x: string]: any }) {
  if (typeof objValue == 'object') {
    for (const i in objValue) {
      if (typeof objValue[i] != 'object') {
        const value = objName + '[' + i + ']=' + objValue[i]
        nextStr += encodeURI(value) + '&'
      } else {
        changeSonType(objName + '[' + i + ']', objValue[i])
      }
    }
  }
  return nextStr
}
