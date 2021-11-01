const path = require("path"),
  webpack = require("webpack"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  TerserPlugin = require("terser-webpack-plugin"),
  utils = require("./utils"),
  CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => ({
  context: path.resolve(__dirname, "src"),
  entry: ['./app.js'],
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "src/views"),
    hot: true
  },
  resolve: {
    extensions: [".js"],
    alias: {
      source: path.resolve(__dirname, "src"), // Relative path of src
      images: path.resolve(__dirname, "src/assets/images"), // Relative path of images
      fonts: path.resolve(__dirname, "src/assets/fonts"), // Relative path of fonts
      videos: path.resolve(__dirname, "src/assets/videos")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: {presets: ["env"]}
      },
      {
        test: /\.(s?)css$/,
        use: [
          // "style-loader", "css-loader", "postcss-loader",
          // env === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          // {
          //   loader: "css-loader",
          //   options: {url: false, importLoaders: 1, sourceMap: true, minimize: true, colormin: false}
          // }
          env === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {url: false, importLoaders: 1, sourceMap: true, minimize: true, colormin: false}
          },
          "postcss-loader",
          "sass-loader"
        ],
        // include: path.resolve(__dirname, 'src/assets/styles/*.css')
      },
      /*   {
           test: /\.scss$/,
           use: [
             env === "development" ? "style-loader" : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
             {
               loader: "css-loader",
               options: {
                 importLoaders: 1,
                 minimize: true,
                 sourceMap: true,
                 colormin: false
               }
             },
             "postcss-loader",
             "sass-loader"
           ],
           // include: path.resolve(__dirname, 'src/assets/styles/!*.scss')
         },*/
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          data: {
            sidebar: JSON.stringify([
              {
                "title": "Documentation",
                "has_children": true,
                "icon": "fa fa-file",
                "is_active": false,
                "children": [
                  {
                    "title": "Buttons",
                    "url": "/ad-elements/buttons.html",
                    "is_active": false
                  }
                ]
              },
            ])
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|ico|srt|vtt)(\?.*)?$/,
        loader: "file-loader",
        options: {limit: 30000, name: "assets/images/[name].[ext]"}
      },
      {
        test: /\.(woff|woff2?|eot|ttf|otf|srt|vtt)(\?.*)?$/,
        loader: "file-loader",
        options: {
          name: "assets/fonts/[name].[ext]"
        }
      },
      {
        test: /\.(mp4)(\?.*)?$/,
        loader: "file-loader",
        options: {
          limit: 30000,
          name: "assets/videos/[name].[ext]"
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          filename: "assets/js/vendor.bundle.js",
          chunks: "all",
          test: /node_modules/
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].bundle.css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: __dirname + '/src/assets/images',
          to: 'assets/images',
        },
        {
          from: __dirname + '/src/assets/vendor',
          to: 'assets/vendor',
        },
        {
          from: __dirname + '/src/assets/fonts',
          to: 'assets/fonts',
        },
      ]
    }),
    ...utils.pug(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.$": "jquery",
      "window.jQuery": "jquery",
      Popper: ["popper.js", "default"]
    }),

    // new webpack.ProvidePlugin({
    //   "videojs": "video.js",
    //   "window.videojs": "video.js"
    // }),
    // new VueLoaderPlugin()
  ]
});
