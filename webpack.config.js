const path = require("path");

const config = {
	entry: ["react-hot-loader/patch", "./src/index.js"],
	output: {
		path: path.resolve("dist"),
		filename: "bundle.js"
	},
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				test: /\.jpg$/,
				use: [
					{
						loader: "url-loader",
						options: {
							mimetype: "image/jpg"
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: [".js", ".jsx"],
		alias: {
			"react-dom": "@hot-loader/react-dom"
		}
	},
	devServer: {
		contentBase: "dist",
		historyApiFallback: true
	}
};

module.exports = config;
