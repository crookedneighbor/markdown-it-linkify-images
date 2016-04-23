'use strict'

function markdownitLinkifyImages (md, config) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    config = config || {}

    var token = tokens[idx]
    var srcIndex = token.attrIndex('src')
    var url = token.attrs[srcIndex][1]
    var caption = token.content

    var target = generateTargetAttribute(config.target)
    var linkClass = generateClass(config.linkClass)
    var imgClass = generateClass(config.imgClass)

    return '' +
      '<a href="' + url + '"' + linkClass + target + '>' +
        '<img src="' + url + '" alt="' + caption + '"' + imgClass + '>' +
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
