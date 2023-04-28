const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = (_, argv) => {
    const isDevelopment = argv.mode === 'development';
    const outputPath = 'bundle/[contenthash]';
    
    return {
        entry: {
            index: './src/js/'
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `${outputPath}.js`,
            assetModuleFilename: 'assets/[hash][ext][query]',
            clean: { keep: /lib\// }
        },
        resolve: {
            extensions: ['.js']
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(png|gif|jpe?g|svg|json)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(woff|woff2|ttf|eot|otf|svg)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.(scss|css)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `${outputPath}.min.css`
            }),
            new HtmlPlugin({
                filename: 'index.html',
                favicon: path.resolve(__dirname, 'src/images/system/favicon.ico'),
                template: path.resolve(__dirname, 'src/layout.html')
            })
        ],
        optimization: {
            moduleIds: 'deterministic',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    terserOptions: { format: { comments: false } },
                    extractComments: false
                }),
                new CssMinimizerPlugin()
            ]
        },
        devtool: isDevelopment ? 'eval-source-map' : false
    };
};
