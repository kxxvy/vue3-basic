const tool = {
  md5Encrypt: function (psd: any) {
    return CryptoJS.MD5(psd).toString()
  },

  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },

  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  },

  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  },

  clearCache() {
    window.localStorage.clear()
  }
}

export default () => {
  if (typeof window.tool == 'undefined') {
    window.tool = tool
  }
}
