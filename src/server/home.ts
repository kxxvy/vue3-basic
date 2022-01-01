import url from './urls'

export default class Home {
  static getUserInfo(params: string | null) {
    return window.$http.get(url.getUserInfo + params, undefined)
  }
}
