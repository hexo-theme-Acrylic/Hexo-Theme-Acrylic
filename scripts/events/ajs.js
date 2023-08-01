'use strict'
// 全局声明插件代号
const pluginname = 'ajs_to_js'
// 全局声明依赖
const fs = require('fs').promises;
const path = require('node:path');
const logger = require('hexo-log')()
const { cyan, magenta } = require('picocolors');
const prettyHrtime = require('pretty-hrtime');


let content = ""
let file_cout = 0
const start = process.hrtime();

hexo.extend.console.register('ajs', 'Ajs2js', function(args) {
  const config = this.config
  const theme = this.config.theme_config
  const { input_path, output_path } = {
    input_path: config.ajs.input_path,
    output_path: config.ajs.output_path,
  };
  function replaceContent(content, themeData, configData) {
    const themeRegex = /\"#{theme\.([\w.]+)?}\"/g;
    const configRegex = /\"#{config\.([\w.]+)?}\"/g;
    content = content.replace(themeRegex, (match, key) => {
      const keys = key.split('.');
      let value = themeData;
      keys.forEach((k) => {
        if (!value.hasOwnProperty(k)) {
          logger.error(key, "is not defined in themeData");
          process.exit(1);
        }
        value = value[k];
      });
      return value;
    });
    content = content.replace(configRegex, (match, key) => {
      const keys = key.split('.');
      let value = configData;
      keys.forEach((k) => {
        if (!value.hasOwnProperty(k)) {
          logger.error(key, "is not defined in configData");
          process.exit(1);
        }
        value = value[k];
      });
      return value;
    });
    return content;
  }
  async function handleFile(file, themeData, configData) {
    if (!file.endsWith('.ajs')) return;
    const iPath = path.join(input_path, file);
    const oldcontent = await fs.readFile(iPath, 'utf8');
    const newFileName = file.replace('.ajs', '.js')
    const oPath = path.join(output_path, newFileName);
    const newContent = replaceContent(oldcontent, themeData, configData);
    await fs.writeFile(oPath, newContent);
    content += `Generated: ${magenta(oPath)}\n`;
    file_cout++
  }
  async function main() {
    const interval = prettyHrtime(process.hrtime(start));
    logger.info('Files loaded in %s', cyan(interval));
    try {
      const files = await fs.readdir(input_path);
      await Promise.all(files.map(file => handleFile(file, theme, config)));
      logger.info(content)
      const interval = prettyHrtime(process.hrtime(start));
      logger.info('%s Files loaded in %s', file_cout, cyan(interval));
      process.exit(1);
    } catch (err) {
      logger.error(err);
      process.exit(1);
    }
  }

  main();
})