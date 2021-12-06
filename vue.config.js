const cdn = {
  js: [
    'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.js',
    'https://ydcommon.51yund.com/vue/crypto-js.min.js',
  ],
  css: [
    'https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css',
  ]
}

module.exports = {
  lintOnSave: false,
  outputDir: './build',
  publicPath: process.env.env_config === 'prod' ? '/apps/web/' : process.env.env_config === 'test' ? '/vapps/peExam/' : '/',
  // 设置跨域
  crossorigin: 'anonymous',
  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,
  transpileDependencies: ['swiper', 'dom7'],

  // 它支持webPack-dev-server的所有选项
  devServer: {
    // host: "localhost",
    port: 8083, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    proxy: '' // 配置跨域处理
  },

  //这是一个不进行任何 schema 验证的对象，因此它可以用来传递任何第三方插件选项
  pluginOptions: {
    // 设置线上部署路径，发布时请修改 eg: /data2/wwwroot/web/vue/vapps/vip
    onlineRootPath: '/apps/web',
    testRootPath: '/data2/wwwroot/web_lip/vue/vapps/peExam',
  },

  chainWebpack: (config) => {
    config.plugin('html').tap((options) => {
      options[0].cdn = cdn
      return options
    })
  },

  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }]
    },
    externals: {
      'crypto-js': 'CryptoJS',
      nprogress: 'NProgress'
    }

    // 这是七牛找不到资源时的紧急处理方法，通过修改hash位数修改编译后的资源文件名
    // output: {
    //     filename: `js/[name].[hash:6].js`,
    //     chunkFilename: `js/[name].[hash:6].js`
    // },
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: `css/[name].[hash:6].css`,
    //         chunkFilename: `css/[name].[hash:6].css`
    //     })
    // ]
  }
}
