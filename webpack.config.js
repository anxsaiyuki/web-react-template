var path = require("path"),
    webpack = require("webpack"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    page = require("./page.json");

module.exports = {
    cache: true,
    entry: page,
    output: {
        path: path.join(__dirname, 'dist'),
        //publicPath: 'http://dev-taiwan-1089406050.ap-southeast-1.elb.amazonaws.com/erpweb/dist/',
        publicPath: '',
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
         
            { 
                test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" 
            },
            { 
                test: /\.jpg$/, loader: "file-loader" 
            },
            {
                test: /\.jsx$/,
                loader: "jsx-loader?insertPragma=React.DOM&harmony"
            },
            {
                test: /.*\.(gif|png|jpg)$/,
                loaders: ['image?optimizationLevel=7&interlaced=false']
            }
    ]
    },
    plugins: [
      new ExtractTextPlugin("css/[name].css")

  ],
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        //'react': 'React'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
