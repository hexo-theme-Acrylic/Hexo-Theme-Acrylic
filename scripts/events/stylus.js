/**
 * stylus
 */

'use strict'

hexo.extend.filter.register('stylus:renderer', function (style) {
  style
    .define('$highlight_enable', true)
    .define('$highlight_line_number', true)
    // .import(this.source_dir.replace(/\\/g, '/') + '_data/css/*')
})
