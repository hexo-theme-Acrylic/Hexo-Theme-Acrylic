hexo.extend.helper.register('getarray_bar', function (types) {
  if (!types) {
    types = "category"
  }
  const categoriesBar = function (categories) {
    if (!categories || !categories.length) return ``
    const categoryArr = []
    hexo.locals.get('categories').map(function (category) {
      categoryArr.push({ name: category.name, value: category.length })
    })
    categoryArr.sort((a, b) => { return b.value - a.value })
    let strCategoriesBar = ``
    for (let i = 0; i < categories.length; i++) {
      strTemp=`
      <div class="category-bar-item" id="${categoryArr[i].name}">
      <a href="/categories/${categoryArr[i].name}/">${categoryArr[i].name}</a>
      </div>`
      strCategoriesBar+=strTemp
    }
    return strCategoriesBar
  }
  const tagsBar = function(tags) {
    if (!tags || !tags.length) return ``
    const tagArr = []
    hexo.locals.get('tags').map(function (tag) {
      tagArr.push({ name: tag.name, value: tag.length })
    })
    tagArr.sort((a, b) => { return b.value - a.value })
    let strTagsBar = ``
    for (let i = 0; i < tags.length; i++) {
      strTemp=`
      <div class="category-bar-item" id="${tagArr[i].name}">
      <a href="/tags/${tagArr[i].name}/">${tagArr[i].name}</a>
      </div>`
      strTagsBar+=strTemp
    }
    return strTagsBar
  }
  if (types == "category"){
    return categoriesBar(this.site.categories)
  }
  if (types == "tag"){
    return tagsBar(this.site.tags)
  }
})