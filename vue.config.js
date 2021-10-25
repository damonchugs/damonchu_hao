module.exports = {
  //baseUrl从 Vue CLI 3.3 起已弃用，请使用publicPath。
  publicPath: './',
  outputDir: 'damonchu_hao',//默认值为dist，构建输出目录，若打包时不改会覆盖之前版本
  assetsDir: 'assets',//默认为'',静态文件目录(css,img,js,fonts)
  lintOnSave: false,//默认true，开启会降低执行效率，用途是eslint检测代码，可选值：true,false,'error'，当为true时检测代码，出现错误时提示信息会输出到命令行，不会编译失败；为'error',出现错误编译会失败
  devServer:{
    open: true,//服务开启后直接在浏览器中打开主页面
    // host: 'localhost',//主机名
    port: 4369,//端口号
    https: false,//是否开启https
    hotOnly: true,//是否开启热模块更新
    proxy:{
      //配置跨域,可参见官方文档https://webpack.js.org/configuration/dev-server/#devserverproxy
      '/api':{
          target:'http://localhost:4369/api/',//跨域地址
          ws:true,//如果要代理WebSockets,设置为true
          changOrigin:true,//默认flase,将主机头的原点更改为目标URL
          pathRewrite:{//如果不希望传递/api，则需要重写路径：
              '^/api':''
          }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  }
}
