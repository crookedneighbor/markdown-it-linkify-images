var chai = require('chai')
var expect = chai.expect
var MarkdownIt = require('markdown-it')
var linkifyImages = require('../')

describe('markdown-it-linkify-images', function () {
  beforeEach(function () {
    this.md = new MarkdownIt()
  })

  it('adds a link around the image', function () {
    this.md.use(linkifyImages)

    var result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql('<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption"></a></p>\n')
  })

  it('contains the original markdown rendering', function () {
    // Sanity check to make sure the way the image rule works does not change
    // If this fails, you may need to inspect the markup of the rule
    var imageMd = '![caption](https://image.com/image.png)'

    var originalResultRaw = this.md.render(imageMd)
    // remove surrounding paragraph tag
    var image = originalResultRaw.substr(3, originalResultRaw.length - 8)

    this.md.use(linkifyImages)

    var result = this.md.render(imageMd)

    expect(result).to.contain(image)
  })

  it('can be configured to set link target', function () {
    this.md.use(linkifyImages, {
      target: '_blank'
    })

    var result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql('<p><a href="https://image.com/image.png" target="_blank"><img src="https://image.com/image.png" alt="caption"></a></p>\n')
  })
})
