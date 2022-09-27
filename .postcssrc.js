module.exports = {
  plugins: {
    // vueVLI内部已经配置了 autoprefixer插件
    // 所以又配了一次，所以产生了冲突
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    'postcss-pxtorem': {
      // rootValue: 37.5,
      // 我的设计稿是750，vant是基于375写的。所以必须设置为37.5、
      // 如果是Vant的样式就按37.5 ，我的样式就按75来转换
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
  }
}
