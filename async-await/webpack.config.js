module.exports = {
  // Points where we want to compile the typescript files
  entry: "./src/app.ts",
  //   Will compile out to this directory
  output: {
    filename: "app.js",
    path: __dirname + "./dist"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        // It's in the package.json takes care of loading webpack
        use: "awesome-typescript-loader"
      }
    ]
  },
  devServer: {
    port: 3000
  }
};
