interface Window {
  $http: {
    post: Function
    get: Function
    delete: Function
    patch: Function
    upload: Function
  }
  utils: {
    padLeftZero: Function
    formatDate: Function
    formatDuration: Function
    formatNumber: Function
    trimStr: Function
    preloadImg: Function
    throttle: Function
    debounce: Function
    voicePrompt: Function
  }
}
