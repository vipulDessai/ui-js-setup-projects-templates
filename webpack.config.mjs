import path from "path";
import dotenv from "dotenv";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { fileURLToPath } from "url";
import Module from "node:module";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as fs from "node:fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { GenerateSW } from "workbox-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import ESLintPlugin from "eslint-webpack-plugin";

import {
  getClientEnvironment,
  getPackagesResolvingAlias,
} from "./webpack/index.mjs";

console.info(
  "Current Specified Enviornment: " + (process.env.NODE_ENV || null),
);

let webpackMode = "";
let needHotReload = false;
let needSourceMaps = false;
let needBundleAnalyser = false;
let generateServiceWorker = false;
let skipTypeCheck = false;
// while the HMR is active certain precached modules
// throw error while recompiling which takes away
// the advantage of HMR, so while development
// include them by setting excludePrecachedLibs
let excludePrecachedLibs = false;

const NODE_ENV = process.env.NODE_ENV || "dev";
switch (NODE_ENV) {
  case "prod":
  case "stage":
  case "dev":
  case "test":
    // TODO: later once the build is stable, change "needSourceMaps" to false
    needSourceMaps = true;
    generateServiceWorker = true;
    skipTypeCheck = true;
    excludePrecachedLibs = true;
    webpackMode = "production";
    break;

  case "local":
    needHotReload = true;
    needSourceMaps = true;
    needBundleAnalyser = false; // TODO: set needBundleAnalyser
    webpackMode = "development";
    break;

  default:
    needSourceMaps = true;
    generateServiceWorker = true;
    skipTypeCheck = true;
    excludePrecachedLibs = true;
    webpackMode = "development";
    break;
}

console.info("Current Actual Enviornment: " + NODE_ENV);
console.info("Hot Reload: " + needHotReload);

// inline-source-map - Full source map inlined in the bundle (the code is as it is, without the .map files)
// hidden-source-map
//   - Use hidden-source-map or nosources-source-map to avoid exposing sensitive source code.
//   - Serve .map files selectively or restrict access to them.
console.info(
  "Generate Source Maps: " +
    (needSourceMaps ? "inline-source-map" : "hidden-source-map"),
);

console.info("Skip Type Checking: " + skipTypeCheck);

console.info("Bundle Analyser: " + needBundleAnalyser);
console.info("Generate Service Worker: " + generateServiceWorker);
console.info("Cache Prebuild large lib binaries: " + excludePrecachedLibs);

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const require = Module.createRequire(import.meta.url);

const envFilePath = path.resolve(__dirname, `.env.${NODE_ENV}`);
dotenv.config({ path: envFilePath, safe: true });

const packagesAlias = getPackagesResolvingAlias();
const { envRaw, envStringified } = getClientEnvironment("");

export default {
  mode: webpackMode,

  entry: {
    app: "./src/index.js", // Entry point
  },

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].bundle.js",
    chunkFilename: "[name].[contenthash].chunk.js", // Output for dynamically loaded chunks
    publicPath: "/", // Ensure the chunks are resolved from the correct path
    clean: true, // Ensures the output folder is cleared before building, so old files don’t linger.
  },

  optimization: {
    splitChunks: {
      chunks: "all", // enable auto code chunks for all code splits
      maxSize: 200000, // Split files larger than 200 KB
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            booleans: true, // Optimize boolean expressions (e.g., `!!a` becomes `a`)
            dead_code: true, // Remove unreachable code
            unused: true, // Drop unused variables and functions
            drop_console: true, // Remove all console.* calls
            drop_debugger: true, // Remove debugger statements
            conditionals: true, // Optimize if-else and ternary expressions
            sequences: true, // Combine consecutive statements using the comma operator
            ecma: 2015, // Optimize for ES6
            passes: 3, // Apply compression passes multiple times for better results
          },
          mangle: true, // Shorten variable names
          output: {
            comments: false, // Remove comments
            ascii_only: true, // Prevents encoding issues
          },
          sourceMap: needSourceMaps,
        },
        parallel: true, // Enable multi-threading for faster builds
      }),
    ],
  },

  // global resolver, without include or exclude path
  // for finer alias management use the module -> rules -> alias
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    alias: {
      ...packagesAlias,
    },
  },

  module: {
    rules: [
      {
        oneOf: [
          // Process the application source code for javascript
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                plugins: [
                  needHotReload && [
                    require.resolve("react-refresh/babel"),
                    {
                      skipEnvCheck: true, // because there are custom enviornments like locals, production, stage etc
                    },
                  ],
                ].filter(Boolean),
              },
            },
            resolve: {
              alias: {
                react: path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react",
                ),
                "react-dom": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-dom",
                ),
                "react-router-dom": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-router-dom",
                ),
                "react-bootstrap": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-bootstrap",
                ),
                react18: path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react",
                ),
                "react18-dom": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-dom",
                ),
                "react18-router": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-router-dom",
                ),
                "react18-bootstrap": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-bootstrap",
                ),
              },
            },
          },
          // Process the application source code for typescript
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env", "@babel/preset-react"],
                },
              },
              {
                loader: require.resolve("ts-loader"),
                options: {
                  getCustomTransformers: () => ({
                    before: [needHotReload && ReactRefreshTypeScript()].filter(
                      Boolean,
                    ),
                  }),
                  transpileOnly: skipTypeCheck,
                  compilerOptions: {
                    inlineSourceMap: needSourceMaps,
                  },
                },
              },
            ],
            resolve: {
              alias: {
                react: path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react",
                ),
                "react-dom": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-dom",
                ),
                "react-router-dom": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-router-dom",
                ),
                "react-bootstrap": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-bootstrap",
                ),
                react18: path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react",
                ),
                "react18-dom": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-dom",
                ),
                "react18-router": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-router-dom",
                ),
                "react18-bootstrap": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-bootstrap",
                ),
              },
            },
          },

          // process the react old dependencies with react old version
          {
            test: /\.js$/,
            include: /\/packages\/react-16\/node_modules/,
            exclude: [
              /@babel(?:\/|\\{1,2})runtime/,
              /jquery-ui-dist\/jquery-ui\.js/,
              /react-dom\/cjs\/react-dom\.development\.js/,
              /ace-builds\/src-noconflict\/ace\.js/,
              /ace-builds\/src-noconflict\/mode-php\.js/,
              /ace-builds\/src-noconflict\/mode-php_laravel_blade\.js/,
              /ace-builds\/src-noconflict\/worker-xquery\.js/,
            ],
            use: {
              loader: "babel-loader",
              options: {
                // Babel sourcemaps are needed for debugging into node_modules
                // code.  Without the options below, debuggers like VSCode
                // show incorrect code and set breakpoints on the wrong lines.
                sourceMaps: needSourceMaps,
                inputSourceMap: needSourceMaps,
              },
            },
            resolve: {
              alias: {
                react: path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react",
                ),
                "react-dom": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-dom",
                ),
                "react-router-dom": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-router-dom",
                ),
                "react-bootstrap": path.resolve(
                  __dirname,
                  "./packages/react-16/node_modules/react-bootstrap",
                ),
              },
            },
          },
          // process the react latest dependencies with react new version
          {
            test: /\.js$/,
            include: /\/packages\/react-18\/node_modules/,
            exclude: [
              /@babel(?:\/|\\{1,2})runtime/,
              /@mui\/icons-material\/esm\/index\.js/,
              /react-dom\/cjs\/react-dom\.development\.js/,
              excludePrecachedLibs &&
                /apexcharts\/dist\/apexcharts\.common\.js/,
            ].filter(Boolean),
            use: {
              loader: "babel-loader",
              options: {
                // Babel sourcemaps are needed for debugging into node_modules
                // code.  Without the options below, debuggers like VSCode
                // show incorrect code and set breakpoints on the wrong lines.
                sourceMaps: needSourceMaps,
                inputSourceMap: needSourceMaps,
              },
            },
            resolve: {
              alias: {
                react: path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react",
                ),
                "react-dom": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-dom",
                ),
                "react-router-dom": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-router-dom",
                ),
                "react-bootstrap": path.resolve(
                  __dirname,
                  "./packages/react-18/node_modules/react-bootstrap",
                ),
              },
            },
          },

          // process application css with post css
          // exclude node_modules so that post loader
          // does NOT aaply css from NPM packages
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: { esModule: true }, // Required for lazy loading
              },
              {
                loader: "css-loader", // Process CSS files
                options: {
                  importLoaders: 1,
                  url: false, // Ignore `url()` paths in CSS
                },
              },
              "postcss-loader",
            ],
          },
          // process the application only SCSS
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: { esModule: true }, // Required for lazy loading
              },
              {
                loader: "css-loader", // Process CSS files
                options: {
                  importLoaders: 3,
                  url: false, // Ignore `url()` paths in CSS
                },
              },
              "sass-loader", // Process SCSS files
            ],
          },

          // process the css from NPM packages
          // so that the styles for the NPM packages
          // is applied
          {
            test: /\.css$/,
            include: [
              /\/packages\/react-16\/node_modules/,
              /\/packages\/react-18\/node_modules/,
            ],
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: { esModule: true }, // Required for lazy loading
              },
              {
                loader: "css-loader", // Process CSS files
                options: {
                  url: false, // Ignore `url()` paths in CSS
                },
              },
            ],
            sideEffects: false, // is required to perform tree shaking, for modules that are not imported
          },

          // "file" loader makes sure those assets get served by WebpackDevServer.
          // When you `import` an asset, you get its (virtual) filename.
          // In production, they would get copied to the `build` folder.
          // This loader doesn't use a "test" so it will catch all modules
          // that fall through the other loaders.
          {
            loader: require.resolve("file-loader"),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
          // ** STOP ** Are you adding a new loader?
          // Make sure to add the new loader(s) before the "file" loader.
        ],
      },
    ],
  },

  plugins: [
    new webpack.ProgressPlugin(),
    // Enables React HMR
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new webpack.DefinePlugin(envStringified),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      ignoreOrder: true, // Enable to remove warnings about conflicting order
    }),
    needBundleAnalyser &&
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
      }),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: resolveApp("public/index.html"),
          templateParameters: envRaw,
        },
        webpackMode === "production"
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : undefined,
      ),
    ),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"), // Source folder
          to: path.resolve(__dirname, "build"), // Destination folder
          globOptions: {
            ignore: ["**/index.html"], // Ignore index.html if using HtmlWebpackPlugin
          },
        },
      ],
    }),
    generateServiceWorker &&
      new GenerateSW({
        swDest: "service-worker.js",
        skipWaiting: true, // Force the service worker to activate as soon as it's installed
        clientsClaim: true, // Make the service worker take control of pages immediately
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst", // Serve from network, fallback to cache
          },
          {
            urlPattern: ({ request }) =>
              ["style", "script", "worker"].includes(request.destination),
            handler: "StaleWhileRevalidate", // Serve from cache while updating cache
          },
        ],
        exclude: [/\.map$/, /asset-manifest\.json$/],
      }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"], // Check JavaScript and TypeScript files
      failOnError: false, // Set to true to fail the build on linting errors
      emitWarning: true, // Emit warnings instead of errors
      overrideConfigFile: path.resolve(__dirname, ".eslintrc.js"), // Custom ESLint config
    }),
  ].filter(Boolean),

  devServer: {
    static: {
      directory: path.join(__dirname, "public"), // Serve files from the "dist" directory
    },
    port: process.env.PORT || 3000,
    open: true,
    hot: true,
    client: {
      progress: true,
      overlay: false,
    },
    historyApiFallback: true, // Redirect all 404s to index.html
  },

  // inline-source-map - Full source map inlined in the bundle (the code is as it is, without the .map files)
  // hidden-source-map
  //   - Use hidden-source-map or nosources-source-map to avoid exposing sensitive source code.
  //   - Serve .map files selectively or restrict access to them.
  devtool: needSourceMaps ? "inline-source-map" : "hidden-source-map",
};
