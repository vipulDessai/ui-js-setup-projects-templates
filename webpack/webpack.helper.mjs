import path from "path";
import { fileURLToPath } from "url";
import Module from "node:module";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const require = Module.createRequire(import.meta.url);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i;

export function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter((key) => {
      return key !== "NODE_ENV" && REACT_APP.test(key);
    })
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || "development",
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
        // We support configuring the sockjs pathname during development.
        // These settings let a developer run multiple simultaneous projects.
        // They are used as the connection `hostname`, `pathname` and `port`
        // in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
        // and `sockPort` options in webpack-dev-server.
        WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
        WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
        WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
      },
    );

  // Stringify all values so we can feed into webpack DefinePlugin
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {}),
  };

  return { envRaw: raw, envStringified: stringified };
}

export const getPackagesResolvingAlias = () => {
  const oldLibs = require("../packages/react-16/package.json");
  const newLibs = require("../packages/react-18/package.json");

  // IMPORTANT: if any of the modules are resolved in webpack.config.mjs
  // at webpackConfig -> resolve -> alias
  // set them here or their duplicate alias will be added which
  // may have unpredictable issues
  const excludedPackages = new Set([
    "react",
    "react-dom",
    "react-router-dom",
    "react-bootstrap",
  ]);

  const normalizedPackages = {};
  for (const key in oldLibs.dependencies) {
    if (!excludedPackages.has(key))
      normalizedPackages[key] = path.resolve(
        __dirname,
        `../packages/react-16/node_modules/${key}`,
      );
  }

  for (const key in newLibs.dependencies) {
    if (!excludedPackages.has(key))
      normalizedPackages[key] = path.resolve(
        __dirname,
        `../packages/react-18/node_modules/${key}`,
      );
  }

  return normalizedPackages;
};
