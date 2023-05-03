# markdown-it-linkify-images

[![Greenkeeper badge](https://badges.greenkeeper.io/crookedneighbor/markdown-it-linkify-images.svg)](https://greenkeeper.io/)
A markdown-it plugin to add links to images

> Linkifying Images plugin for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser.

## Install

```bash
npm install markdown-it-linkify-images --save
```

## Use

```js
const md = require('markdown-it')()
const mili = require('markdown-it-linkify-images')
```

```js
// Basic Use
md.use(mili)

const html = md.render('![the image caption](img/smile.png)')
html // <p><a href="img/smile.png" target="_self"><img src="img/smile.png" alt="the image caption"></a></p>
```

```js
// With Custom Configuration
md.use(mili, {
  target: '_blank',
  linkClass: 'custom-link-class',
  imgClass: 'custom-img-class'
})

const html = md.render('![the image caption](img/smile.png)')
html // <p><a href="img/smile.png" target="_blank" class="custom-link-class"><img src="img/smile.png" alt="the image caption" class="custom-img-class"></a></p>
```

_Differences in browser._ If you load script directly into the page, without a package system, the module will add itself globally as `window.markdownitLinkifyImages`.

## Testing

This plugin is tested against markdown-it @ 6,7,8 and latest

## License

[MIT](https://github.com/markdown-it/markdown-it-footnote/blob/master/LICENSE)
