hexo.extend.helper.register('catalog_list', function (type) {
  let html = ``
  hexo.locals.get(type).map(function (item) {
    html += `
    <div class="catalog-list-item" id="/${item.path}">
      <a href="/${item.path}">${(hexo.config.emoji && hexo.config.emoji[item.name] || '') + item.name}<sup>${item.length}</sup></a>
    </div>
    `
  })
  return html
})