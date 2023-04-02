/**
 * Butterfly
 * @example
 *  page_description()
 *  cloudTags(source, minfontsize, maxfontsize, limit)
 *  pagecloud(source)
 */

'use strict'

const { stripHTML, escapeHTML, prettyUrls } = require('hexo-util')
const crypto = require('crypto')

hexo.extend.helper.register('page_description', function () {
  const { config, page } = this
  let description = page.description || page.content || page.title || config.description

  if (description) {
    description = escapeHTML(stripHTML(description).substring(0, 150)
      .trim()
    ).replace(/\n/g, ' ')
    return description
  }
})

hexo.extend.helper.register('cloudTags', function (options = {}) {
  const env = this
  let source = options.source
  let result = ''
  const sizes = []
  source.sort('length').forEach(tag => {
    const { length } = tag
    if (sizes.includes(length)) return
    sizes.push(length)
  })

  source.forEach(tag => {
    result += `<a href="${env.url_for(tag.path)}">${tag.name}<sup>${tag.length}</sup></a>`
  })
  return result
})

hexo.extend.helper.register('pagecloud', function (options = {}) {
  const env = this
  let source = options.source
  let result = ''
  const sizes = []
  source.sort('length').forEach(tag => {
    const { length } = tag
    if (sizes.includes(length)) return
    sizes.push(length)
  })

  source.forEach(tag => {
    result += `<a href="${env.url_for(tag.path)}" id="${tag.name}" data-pjax-state=""><span class="tags-punctuation"></span> ${tag.name} <span class="tagsPageCount">${tag.length}</span></a>`
  })
  return result
})

hexo.extend.helper.register('urlNoIndex', function (url = null) {
  return prettyUrls(url || this.url, { trailing_index: false, trailing_html: false })
})

hexo.extend.helper.register('md5', function (path) {
  return crypto.createHash('md5').update(decodeURI(this.url_for(path))).digest('hex')
})

hexo.extend.helper.register('injectHtml', function (data) {
  let result = ''
  if (!data) return ''
  for (let i = 0; i < data.length; i++) {
    result += data[i]
  }
  return result
})

hexo.extend.helper.register('findArchivesTitle', function (page, menu, date) {
  if (page.year) {
    const dateStr = page.month ? `${page.year}-${page.month}` : `${page.year}`
    const date_format = 'YYYY'
    return date(dateStr, date_format)
  }

  const defaultTitle = this._p('page.archives')
  if (!menu) return defaultTitle

  const loop = (m) => {
    for (const key in m) {
      if (typeof m[key] === 'object') {
        loop(m[key])
      }

      if (/\/archives\//.test(m[key])) {
        return key
      }
    }
  }

  return loop(menu) || defaultTitle
})
