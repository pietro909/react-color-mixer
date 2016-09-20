var config = {
    entry: './main.js',
    devtool: 'source-map',

    output: {
        path:'./',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 8060
    },

    module: {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
                presets: ['react']
            }
        }
        ]
    }
}

module.exports = config;
