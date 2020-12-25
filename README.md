# html-middleware-webpack-plugin

> This is flexible middle plugin to processing your html when html-webpack-plugin processing source, and this plugin can use in webpack@5 environment. 

# how to use

Add link tag with rel values (dns-prefetch, prefetch, preload, prerender) for optimize load resourse

```javascript
const HtmlMiddlewareWebpackPlugin = require('html-middleware-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin(),
  new HtmlMiddlewareWebpackPlugin({
    // to hint resource
    resourceHint: {
      'dns-prefetch': [String],
      'preconnnect': [String],
      'prefetch': [String],
      'preload': [String],
      'prerender': [String]
    },
    // insert script into body
    scripts: [{
      src: url,
      async: Boolean,
      defer: Boolean
    }],
    // custom tag
    customTags: {
      // insert head
      headTags: [{
        tagName: String,
        voidTag: Boolean,
        attributes: {
          href: String,
          ...
        }
      }],
      // insert body
      bodyTags: [{
        tagName: String,
        voidTag: Boolean,
        attributes: {
          src: String,
          ...
        }
      }]
    }
  })
]
```

# License
MIT

Copyright (c) 2020-present, fwm227
