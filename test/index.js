'use strict'

const chai = require('chai')
const expect = chai.expect
const MarkdownIt = require('markdown-it')
const linkifyImages = require('../')

describe('markdown-it-linkify-images', function () {
  beforeEach(function () {
    this.md = new MarkdownIt()
  })

  it('adds a link around the image', function () {
    this.md.use(linkifyImages)

    const result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql(
      '<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption"></a></p>\n'
    )
  })

  it('does not add a link if the image is already wrapped by a link', function () {
    this.md.use(linkifyImages)

    const result = this.md.render(
      '[![caption](https://image.com/image.png)](https://google.com)'
    )

    expect(result).to.eql(
      '<p><a href="https://google.com"><img src="https://image.com/image.png" alt="caption"></a></p>\n'
    )
  })

  it('can add image titles in the linked image', function () {
    this.md.use(linkifyImages)

    const result = this.md.render(
      '![caption](https://image.com/image.png "mouseover")'
    )

    expect(result).to.eql(
      '<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption" title="mouseover"></a></p>\n'
    )
  })

  it('sanitizes src, alt, title attributes', function () {
    this.md.use(linkifyImages)

    const result = this.md.render(
      '![Dangerous characters: "&<>](https://"&<>/ "\\"&<>")'
    )

    expect(result).to.eql(
      '<p><a href="https://%22&%3C%3E/" target="_self"><img src="https://%22&%3C%3E/" alt="Dangerous characters: &quot;&amp;&lt;&gt;" title="&quot;&amp;&lt;&gt;"></a></p>\n'
    )
  })

  it('passes through all other attributes', function () {
    this.md.use(function (md, config) {
      md.inline.ruler.before(
        'image',
        'attributes_tester',
        function replace (state) {
          const token = state.push('image', 'img', 0)
          token.content = 'caption'
          token.attrs = [
            ['src', 'https://image.com/image.png'],
            ['alt', ''],
            ['width', '100'],
            ['height', '50']
          ]
          state.pos = state.posMax
          return true
        }
      )
    })

    this.md.use(linkifyImages)

    const result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql(
      '<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption" width="100" height="50"></a></p>\n'
    )
  })

  it('contains the original markdown rendering', function () {
    // Sanity check to make sure the way the image rule works does not change
    // If this fails, you may need to inspect the markup of the rule
    const imageMd = '![caption](https://image.com/image.png)'

    const originalResultRaw = this.md.render(imageMd)
    // remove surrounding paragraph tag
    const image = originalResultRaw.substr(3, originalResultRaw.length - 8)

    this.md.use(linkifyImages)

    const result = this.md.render(imageMd)

    expect(result).to.contain(image)
  })

  it('contains the original markdown rendering with titles', function () {
    // Sanity check to make sure the way the image rule works does not change
    // If this fails, you may need to inspect the markup of the rule
    const imageMd = '![caption](https://image.com/image.png "mouseover")'

    const originalResultRaw = this.md.render(imageMd)
    // remove surrounding paragraph tag
    const image = originalResultRaw.substr(3, originalResultRaw.length - 8)

    this.md.use(linkifyImages)

    const result = this.md.render(imageMd)

    expect(result).to.contain(image)
  })

  it('can be configured to set link target', function () {
    this.md.use(linkifyImages, {
      target: '_blank'
    })

    const result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql(
      '<p><a href="https://image.com/image.png" target="_blank"><img src="https://image.com/image.png" alt="caption"></a></p>\n'
    )
  })

  it('can be configured to set a link class', function () {
    this.md.use(linkifyImages, {
      linkClass: 'custom-link-class'
    })

    const result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql(
      '<p><a href="https://image.com/image.png" class="custom-link-class" target="_self"><img src="https://image.com/image.png" alt="caption"></a></p>\n'
    )
  })

  it('can be configured to set multiple link classes', function () {
    this.md.use(linkifyImages, {
      linkClass: 'first-class second-class'
    })

    const result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql(
      '<p><a href="https://image.com/image.png" class="first-class second-class" target="_self"><img src="https://image.com/image.png" alt="caption"></a></p>\n'
    )
  })

  it('can be configured to set an img class', function () {
    this.md.use(linkifyImages, {
      imgClass: 'custom-image-class'
    })

    const result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql(
      '<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption" class="custom-image-class"></a></p>\n'
    )
  })

  it('can be configured to set multiple img classes', function () {
    this.md.use(linkifyImages, {
      imgClass: 'first-class second-class'
    })

    const result = this.md.render('![caption](https://image.com/image.png)')

    expect(result).to.eql(
      '<p><a href="https://image.com/image.png" target="_self"><img src="https://image.com/image.png" alt="caption" class="first-class second-class"></a></p>\n'
    )
  })
})
