const path = require("path");

module.exports = [
  {
    mode: 'development',
    entry: "./src/index.ts",
    node: {
      global: false
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "index.js",
      globalObject: 'this',
      library:{
        name: 'easy-result',
        type: 'umd'
      }

    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
  }
];