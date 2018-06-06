import { Configuration } from "webpack";
import * as path from "path";

const config: Configuration = {
  entry: [
    "./src/scripts/index.ts"
  ],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist")
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  mode: "development",
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" }
    ],
  }
};

export default config;