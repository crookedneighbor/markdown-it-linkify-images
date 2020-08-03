'use strict'

function markdownitLinkifyImages (md, config) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    config = config || {}

    var token = tokens[idx]
    var srcIndex = token.attrIndex('src')
    var url = token.attrs[srcIndex][1]
    var caption = md.utils.escapeHtml(token.content)
    var otherAttributes = ''

    var target = generateTargetAttribute(config.target)
    var linkClass = generateClass(config.linkClass)
    var imgClass = generateClass(config.imgClass);

    ['title', 'width', 'height'].forEach(function (name) {
      otherAttributes += generateAttribute(md, token, name)
    })

    return '' +
      '<a href="' + url + '"' + linkClass + target + '>' +
      '<img src="' + url + '" alt="' + caption + '"' + imgClass + otherAttributes + '>' +
      '</a>'
  }
}

function generateAttribute (md, token, name) {
  if (token.attrIndex(name) === -1) return ''

  var value = md.utils.escapeHtml(token.attrs[token.attrIndex(name)][1])

  return ' ' + name + '="' + value + '"'
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
