class htmlMiddlewareWebpackPlugin {
  constructor (options) {
    this.initHintValue();
    this.initOptions(options);
    this.initHandlerFactory()
  }

  initHintValue () {
    this.relValues = ['dns-prefetch', 'preconnect', 'prefetch', 'preload', 'prerender'];
  }

  initOptions (options) {
    if (Object.prototype.toString.apply(options) === '[object Object]') {
      this.customOptions = options;
    }
  }

  initHandlerFactory () {
    this.handlers = {
      resourceHint: this.insertHintResource,
      scripts: this.insertScripts,
      customTags: this.insertCustomTags
    }
  }

  apply(compiler) {
    const HtmlWebpackPlugin = compiler.options.plugins
      .map(({ constructor }) => constructor)
      .find(constructor => constructor && constructor.name === 'HtmlWebpackPlugin');
    compiler.hooks.make.tapPromise('htmlMiddlewareWebpackPlugin', async compilation => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync('htmlMiddlewareWebpackPlugin', (htmlPluginData, htmlWebpackPluginCallback) => {
        this.executeMiddleware(htmlPluginData);
        htmlWebpackPluginCallback(null, htmlPluginData);
      })
    })
  }

  insertHintResource (htmlPluginData, option_name) {
    let attrs = null
    Object.keys(this.customOptions[option_name]).forEach(hint_val => {
      (this.relValues.findIndex(val => val === hint_val) > -1) && this.customOptions[option_name][hint_val].forEach(href => {
        attrs = {
          rel: hint_val,
          href
        };
        this.insertTags(htmlPluginData, 'headTags', 'link', true, attrs);
      })
    })
  }

  insertScripts (htmlPluginData, option_name) {
    this.customOptions[option_name].forEach(script => {
      this.insertTags(htmlPluginData, 'bodyTags', 'script', false, script);
    })
  }

  insertCustomTags (htmlPluginData, option_name) {
    Object.keys(this.customOptions[option_name]).forEach(tag_pos => {
      this.customOptions[option_name][tag_pos].forEach(tag_info => {
        this.insertTags(htmlPluginData, tag_pos, tag_info.tagName, tag_info.voidTag, tag_info.attributes);
      });
    })
  }

  insertTags (htmlPluginData, position, tagName, voidTag, attrs) {
    htmlPluginData[position].push({
      tagName: tagName,
      voidTag: voidTag,
      attributes: attrs
    });
  }

  executeMiddleware (htmlPluginData) {
    Object.keys(this.customOptions).forEach(option_name => {
      this.handlers.hasOwnProperty(option_name) && this.handlers[option_name].call(this, htmlPluginData, option_name);
    })
  }
}

module.exports = htmlMiddlewareWebpackPlugin;
