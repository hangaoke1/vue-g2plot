const path = require('path')
module.exports = {
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.join(process.cwd(), './src/components')
      }
    ]
  ]
}
