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
    const imgAttributes = concatenateAttributes(
      `src="${url}"`,
      `alt="${caption}"`,
      imgClass,
      ...otherAttributes
    )

    const imgElement = `<img ${imgAttributes}>`

    if (alreadyWrappedInLink(tokens, idx)) {
      return imgElement
    }

    const linkAttributes = concatenateAttributes(
      `href="${url}"`,
      linkClass,
      target
    )

    return `<a ${linkAttributes}>${imgElement}</a>`
  }
}

function concatenateAttributes (...attributes) {
  return attributes.filter((val) => val).join(' ')
}

function generateAttributes (md, token) {
  const ignore = ['src', 'alt']
  const escape = ['title']

  return token.attrs.map((entry) => {
    const name = entry[0]

    if (ignore.includes(name)) return ''

    let value = ''

    if (escape.includes(name)) {
      value = md.utils.escapeHtml(entry[1])
    } else {
      value = entry[1]
    }

    return `${name}="${value}"`
  })
}

function generateTargetAttribute (target) {
  target = target || '_self'

  return `target="${target}"`
}

function generateClass (className) {
  if (!className) return ''

  return `class="${className}"`
}

function alreadyWrappedInLink (tokens, currentTokenIndex) {
  const previousToken = tokens[currentTokenIndex - 1]
  const nextToken = tokens[currentTokenIndex + 1]

  return (
    previousToken &&
    previousToken.type === 'link_open' &&
    nextToken &&
    nextToken.type === 'link_close'
  )
}

module.exports = markdownitLinkifyImages
