const HtmlWebpackPlugin = require('html-webpack-plugin'),
  fs = require('fs'),
  path = require('path'),
  glob = require("glob"),
  getDirectories = (src, callback, options = null) => glob.sync(src, options).map(f => callback(f)),
  srcPath = path.resolve(__dirname, `src`)

exports.pages = function (env, folder = '') {
  const rootPagesFolderName = 'pages',
    viewsFolder = path.resolve(__dirname, `src/views/${rootPagesFolderName}/${folder}`)

  var pages = []

  fs.readdirSync(viewsFolder).forEach(view => {
    if (view.split('.')[1] === undefined)
      return false;

    const viewName = view.split('.')[0];
    const fileName = folder === '' ? `${viewName}/index.html` : `${folder}/${viewName}/index.html`;
    const options = {
      filename: fileName,
      template: `views/${rootPagesFolderName}/${folder}/${view}`,
      inject: true
    };

    if (env === 'development') {
      options.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      };
    }

    pages.push(new HtmlWebpackPlugin(options));
  })

  return pages;
}


const pug = () => getDirectories(
  srcPath + '/**/*.pug',
  (file) => {
    let dirName = path.dirname(file).split(path.sep).pop(),
      FName = path.basename(file).replace('.pug', '.html'),
      filename = dirName.indexOf('views') === -1 && dirName.indexOf('pages') === -1 ? dirName + path.sep + FName : FName

    return new HtmlWebpackPlugin({filename, template: file, inject: true})
  },
  {
    ignore: ['**/mixins/**', '**/components/**']
  }
)

exports.pug = pug
