interface Window {
  $http: {
    post: any
    get: any
    delete: any
    patch: any
    upload: any
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
}
