function linkifyImagesPlugin (md) {
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    var token = tokens[idx]
    var srcIndex = token.attrIndex('src')
    var url = token.attrs[srcIndex][1]
    var caption = token.content

    return '' +
      '<a href="' + url + '">' +
        '<img src="' + url + '" alt="' + caption + '">' +
      '</a>'
  }
}

module.exports = linkifyImagesPlugin
