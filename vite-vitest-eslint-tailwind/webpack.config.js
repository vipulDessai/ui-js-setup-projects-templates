import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import path from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

// TODO: include if vendor needs to be created seperately
// import nodeExternals from "webpack-node-externals";

const isProduction = process.env.NODE_ENV == "production";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const config = {
  target: "node",
  entry: "./src/lib.tsx",
  output: {
    filename: "[name].[contenthash].js", // Output file naming pattern
    path: path.resolve(__dirname, "dist", "dist"), // Output directory
    clean: true, // Clean old build files on each build
    globalObject: "this",
    // TODO: comment the below 'library' attribute to visualize all node_modules inside the main.*.js
    // library: {
    //   name: "lsqUnifiedDashboard",
    //   type: "umd",
    // },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"], // Resolve these extensions
  },
  module: {
    rules: [
      // process all the app source code files
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Babel options can be included here, or in a .babelrc file
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-react", // Optional, if you're using React JSX
              [
                "@babel/preset-env",
                {
                  targets: "> 0.25%, not dead", // Or configure it according to your browser/node versions
                },
              ],
            ],
          },
        },
      },
      // process all the app source CSS code files
      {
        test: /\.css$/, // Handle CSS files
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        exclude: /node_modules/,
      },
      // process all the app others files
      {
        test: /\.(png|jpg|gif|svg|ttf|woff|woff2)$/, // Handle image and font files
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/", // Output path for assets
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  externalsType: "commonjs",
  externals: [
    {
      react: "React",
      "react-dom": "ReactDOM",
      "react-apexcharts": "ReactApexChart",
      axios: "axios",
      "@mui/icons-material": "MUIIcons",
      redux: "redux",
      "react-redux": "react-redux",
      "@reduxjs/toolkit": "@reduxjs/toolkit",
    },
  ],
  // TODO: if exclusion is needed uncomment the below code
  // Exclude React from the bundle
  // externals: [
  //   nodeExternals({
  //     allowlist: [/^@mui\//], // Replace with any package you want to include
  //   }),
  // ],
  // in order to ignore all modules in node_modules folder
  // externalsPresets: {
  //   node: true, // in order to ignore built-in modules like path, fs, etc.
  // },
  // TODO: Later add the build optimizations
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/](@mui|@emotion|stylis)[\\/]/, // Only include @mui
  //         name: "vendor", // Name of the vendor chunk
  //         chunks: "all", // Create this chunk for all entry points
  //       },
  //     },
  //   },
  // },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css", // Output CSS file name
    }),
    // since the TSX transformation will happen outside the webpack
    // i.e. using tsc, here we are manually copying all .css to ./dist/src/**/* destination
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "src/**/*.css", // Copy CSS files from `src`
          to({ context, absoluteFilename }) {
            // Preserve folder structure for CSS files in `./dist/src`
            return path
              .relative(context, absoluteFilename)
              .replace(/^src\//, "../src/"); // ../src/ is used because the webpack output above is set to ./dist/src
          },
        },
      ],
    }),
  ],
  devtool: "source-map", // Enable source maps for easier debugging
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
