function linkifyImagesPlugin (md, config) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    config = config || {}

    var token = tokens[idx]
    var srcIndex = token.attrIndex('src')
    var url = token.attrs[srcIndex][1]
    var caption = token.content

    var target = generateTargetAttribute(config.target)

    return '' +
      '<a href="' + url + '"' + target + '>' +
        '<img src="' + url + '" alt="' + caption + '">' +
      '</a>'
  }
}

function generateTargetAttribute (target) {
  target = target || '_self'

  return ' target="' + target + '"'
}

module.exports = linkifyImagesPlugin
