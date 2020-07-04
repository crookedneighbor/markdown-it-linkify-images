'use strict'

function markdownitLinkifyImages (md, config) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    config = config || {}

    var token = tokens[idx]
    var srcIndex = token.attrIndex('src')
    var url = token.attrs[srcIndex][1]
    var title = ''
    var caption = md.utils.escapeHtml(token.content)
    var width = ''
    var height = ''

    var target = generateTargetAttribute(config.target)
    var linkClass = generateClass(config.linkClass)
    var imgClass = generateClass(config.imgClass)

    if (token.attrIndex('title') !== -1) {
      title = ' title="' + md.utils.escapeHtml(token.attrs[token.attrIndex('title')][1]) + '"'
    }

    if (token.attrIndex("width") !== -1) {
      width = ' width="' + token.attrs[token.attrIndex("width")][1] + '"';
    }

    if (token.attrIndex("height") !== -1) {
      height = ' height="' + token.attrs[token.attrIndex("height")][1] + '"';
    }

    return '' +
      '<a href="' + url + '"' + linkClass + target + '>' +
        '<img src="' + url + '" alt="' + caption + '"' + imgClass + title + width + height + '>' +
      '</a>'
  }
}

function generateTargetAttribute (target) {
  target = target || '_self'

  return ' target="' + target + '"'
}

function generateClass (className) {
  if (!className) return ''

  return ' class="' + className + '"'
}

module.exports = markdownitLinkifyImages
