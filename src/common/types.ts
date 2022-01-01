interface IMethods {
  (url: string, params: any): Promise<any>
}

interface Window {
  $http: {
    post: IMethods
    get: IMethods
    delete: IMethods
    patch: IMethods
    upload: IMethods
  }
  utils: {
    padLeftZero(str: string | any[]): string
    formatDate(value: number, fmt: string): string
    formatDuration(value: number, fmt: string): string | 0
    formatNumber(n: string | any[]): string | any[]
    trimStr(str: string): string
    preloadImg(list: any[], callback: () => void): Promise<unknown>
    throttle(fn: any, delay: any): (...args: any[]) => void
    debounce(fn: any, delay: any): (...args: any[]) => void
    voicePrompt: (readWords: any) => void
  }
  tool: {
    md5Encrypt(psd: any): string
  }
}
