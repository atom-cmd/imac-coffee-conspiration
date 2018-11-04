const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// Assets path for ejs files, can be an external server
const builtAssetsPath = '/assets/';

module.exports = {
    entry: {
        index: './src/modules/index/index.ts',
        moduletest: './src/modules/module-test/module-test.ts'
	},
	resolve: {
        extensions: [".ts", ".js"]
    },
    plugins: [
		new ForkTsCheckerWebpackPlugin(),
        new StyleLintPlugin({
            syntax: 'scss',
            emitErrors: false,
            failOnError: false
        }),
        new ExtractTextPlugin('[name].bundle.css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/modules/index/index.ejs',
            chunks: ['index'],
            assetsPath: builtAssetsPath
        }),
        new HtmlWebpackPlugin({
            filename: 'module-test.html',
            template: './src/modules/module-test/module-test.ejs',
            chunks: ['moduletest'],
            assetsPath: builtAssetsPath
        }),
        new DashboardPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.ejs?$/,
                use: 'ejs-loader'
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
                    transpileOnly: true // Checked in fork plugin
                }
            },
            {
                test:/\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './assets/images/'
                    }
                }]
            }
        ]
    },
    devServer: {
        overlay: true,
        compress: true,
        hot: false
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
