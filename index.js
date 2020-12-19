class htmlMiddlewareWebpackPlugin {
  constructor (options) {
    if (Object.prototype.toString.apply(options) === '[object Object]') {
      this.relValues = ['dns-prefetch', 'preconnect', 'prefetch', 'preload', 'prerender']
      this.customOptions = options
    }
  }

  apply(compiler) {
    const HtmlWebpackPlugin = compiler.options.plugins
      .map(({ constructor }) => constructor)
      .find(constructor => constructor && constructor.name === 'HtmlWebpackPlugin');
    compiler.hooks.make.tapPromise('htmlMiddlewareWebpackPlugin', async compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('htmlMiddlewareWebpackPlugin', (htmlPluginData, htmlWebpackPluginCallback) => {
        this.executeHandleHtml(htmlPluginData)
        htmlWebpackPluginCallback(null, htmlPluginData)
      })
    })
  }

  executeHandleHtml (pluginData) {
    Object.keys(this.customOptions).forEach(optionKey => {
      if (~this.relValues.findIndex(el => el === optionKey)) {
        this.customOptions[optionKey].forEach(val => {
          pluginData.headTags.push({
            tagName: 'link',
            voidTag: true,
            attributes: {
              rel: optionKey,
              href: val
            }
          })
        })
      }
    })
  }
}

module.exports = htmlMiddlewareWebpackPlugin;
