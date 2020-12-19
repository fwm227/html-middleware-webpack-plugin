# html-middleware-webpack-plugin

> This is flexible middle plugin to processing your html when html-webpack-plugin processing source, and this plugin can use in webpack@5 environment. 

# how to use

Add link tag with rel values (dns-prefetch, prefetch, preload, prerender) for optimize load resourse

```javascript
const HtmlMiddlewareWebpackPlugin = require('html-middleware-webpack-plugin');

plugins: [
  new HtmlWebpackPlugin(),
  new HtmlMiddlewareWebpackPlugin({
    'dns-prefetch': [url],
    'preconnnect': [url],
    'prefetch': [url],
    'preload': [url],
    'prerender': [url]
  })
]
```

# License
MIT

Copyright (c) 2020-present, fwm227
