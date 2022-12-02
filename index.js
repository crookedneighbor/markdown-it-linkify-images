'use strict'

function markdownitLinkifyImages (md, config) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    config = config || {}

    const token = tokens[idx]
    const srcIndex = token.attrIndex('src')
    const url = token.attrs[srcIndex][1]
    const caption = md.utils.escapeHtml(token.content)

    const target = generateTargetAttribute(config.target)
    const linkClass = generateClass(config.linkClass)
    const imgClass = generateClass(config.imgClass)
    const otherAttributes = generateAttributes(md, token)

    const imgElement = '<img src="' + url + '" alt="' + caption + '"' + imgClass + otherAttributes + '>'

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
  const ignore = ['src', 'alt']
  const escape = ['title']
  let attributes = ''

  token.attrs.forEach(function (entry) {
    const name = entry[0]

    if (ignore.includes(name)) return

    let value = ''

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
