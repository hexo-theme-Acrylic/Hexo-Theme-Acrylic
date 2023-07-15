const logger = require('hexo-log')()

hexo.extend.filter.register('before_generate', () => {
  // Get first two digits of the Hexo version number
  const hexoVer = hexo.version.replace(/(^.*\..*)\..*/, '$1')

  if (hexoVer < 5.3) {
    logger.error('Please update Hexo to V5.3.0 or higher!')
    logger.error('請把 Hexo 升級到 V5.3.0 或更高的版本！')
    process.exit(-1)
  }

  if (hexo.locals.get) {
    const data = hexo.locals.get('data')
    if (data && data.Acrylic) {
      logger.error(" 'Acrylic.yml' is deprecated. Please use '_config.Acrylic.yml' ")
      logger.error(" 'Acrylic.yml' 已經棄用，請使用 '_config.Acrylic.yml' ")
      process.exit(-1)
    }
  }
})
