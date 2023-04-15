const YML = require('yamljs')
const fs = require('fs')

let ls = [],
    data = YML.parse(fs.readFileSync('source/_data/link.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));

data.forEach((e, i) => { if (i > 1) ls = ls.concat(e.link_list) });
fs.writeFileSync('source/link.json', `{"link_list": ${JSON.stringify(ls)},"length":${ls.length}}`)