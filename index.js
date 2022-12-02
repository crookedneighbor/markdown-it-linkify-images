'use strict'

function markdownitLinkifyImages (md, config) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    config = config || {}

    var token = tokens[idx]
    var srcIndex = token.attrIndex('src')
    var url = token.attrs[srcIndex][1]
    var caption = md.utils.escapeHtml(token.content)

    var target = generateTargetAttribute(config.target)
    var linkClass = generateClass(config.linkClass)
    var imgClass = generateClass(config.imgClass)
    var otherAttributes = generateAttributes(md, token)

    var imgElement = '<img src="' + url + '" alt="' + caption + '"' + imgClass + otherAttributes + '>'

    if (idx > 0 && idx < tokens.length - 1 &&
      tokens[idx - 1] && tokens[idx - 1].type === 'link_open' &&
      tokens[idx + 1] && tokens[idx + 1].type === 'link_close') {
      return imgElement
    }

    return '' +
      '<a href="' + url + '"' + linkClass + target + '>' +
      imgElement +
      '</a>'
  }
}

function generateAttributes (md, token) {
  var ignore = ['src', 'alt']
  var escape = ['title']
  var attributes = ''

  token.attrs.forEach(function (entry) {
    var name = entry[0]

    if (ignore.includes(name)) return

    var value = ''

    if (escape.includes(name)) {
      value = md.utils.escapeHtml(entry[1])
    } else {
      value = entry[1]
    }

    attributes += ' ' + name + '="' + value + '"'
  })

  return attributes
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
