'use strict'

var chai = require('chai')
var expect = chai.expect
var MarkdownIt = require('markdown-it')
var Imsize = require('@centerforopenscience/markdown-it-imsize')
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

  it('can add image titles in the linked image', function () {
    this.md.use(linkifyImages)

    var result = this.md.render('![caption](https://image.com/image.png "mouseover")')

    expect(result).to.eql('<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption" title="mouseover"></a></p>\n')
  })

  it('passes through the width and height attributes', function () {
    this.md.use(Imsize)
    this.md.use(linkifyImages)

    var result = this.md.render('![caption](https://image.com/image.png "mouseover" =42x42)')

    expect(result).to.eql('<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption" title="mouseover" width="42" height="42"></a></p>\n')
  })

  it('sanitizes src, alt, title attributes', function () {
    this.md.use(linkifyImages)

    var result = this.md.render('![Dangerous characters: "&<>](https://"&<>/ "\\"&<>")')

    expect(result).to.eql('<p><a href="https://%22&%3C%3E/" target="_self"><img src="https://%22&%3C%3E/" alt="Dangerous characters: &quot;&amp;&lt;&gt;" title="&quot;&amp;&lt;&gt;"></a></p>\n')
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

  it('contains the original markdown rendering with titles', function () {
    // Sanity check to make sure the way the image rule works does not change
    // If this fails, you may need to inspect the markup of the rule
    var imageMd = '![caption](https://image.com/image.png "mouseover")'

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

  it('can be configured to set a link class', function () {
    this.md.use(linkifyImages, {
      linkClass: 'custom-link-class'
    })

    var result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql('<p><a href="https://image.com/image.png" class="custom-link-class" target="_self"><img src="https://image.com/image.png" alt="caption"></a></p>\n')
  })

  it('can be configured to set multiple link classes', function () {
    this.md.use(linkifyImages, {
      linkClass: 'first-class second-class'
    })

    var result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql('<p><a href="https://image.com/image.png" class="first-class second-class" target="_self"><img src="https://image.com/image.png" alt="caption"></a></p>\n')
  })

  it('can be configured to set an img class', function () {
    this.md.use(linkifyImages, {
      imgClass: 'custom-image-class'
    })

    var result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql('<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption" class="custom-image-class"></a></p>\n')
  })

  it('can be configured to set multiple img classes', function () {
    this.md.use(linkifyImages, {
      imgClass: 'first-class second-class'
    })

    var result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql('<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption" class="first-class second-class"></a></p>\n')
  })
})
