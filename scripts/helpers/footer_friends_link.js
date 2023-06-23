hexo.extend.filter.register('after_generate', function () {
  if (hexo.theme.config.footer.footer_friend_links.enable){
  const YML = require('yamljs')
  const fs = require('fs')
  let ls   = [],
      data = YML.parse(fs.readFileSync('source/_data/link.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));
  data.forEach((e, i) => {
      // let j = data.length-1;  //获取友链数组的范围（除了最后一栏，前面的都获取）
      // if (i != j) ls = ls.concat(e.link_list)
      ls = ls.concat(e.link_list)
  });
  fs.writeFileSync('source/link.json', `{"link_list": ${JSON.stringify(ls)}}`)
}
})