# How to contritube

- Make sure the new file that you add is of react 18 (add the below code at the top of the file)

```tsx
import React from "react18";

// or 

import React from "react";
```

- Make/implement changes and test the code

## Add NPM Module which internally requires the "react"

- if the new implementation requires to install a NPM module that internally requires `react` then the react path needs resolution so add the name of the module to `config/webpack.config.js`
  - under resolve -> alias -> `<add the name that will be used in the application while writing the code as the key>`
  - and its value should be the path to the respective react version
    - example of react-bootstrap using react 16 and 18 respectively

```js
{
    resolve: {
        alias: {
            ...
            "react-bootstrap": path.resolve(
                __dirname,
                "../packages/react-16/node_modules/react-bootstrap"
            ),
            ...
            "react18-bootstrap": path.resolve(
                __dirname,
                "../packages/react-18/node_modules/react-bootstrap"
            ),
        }
    }
}
```

- now we can use in out code

```js
// react 16
import Table from "react-bootstrap/Table";

// react 18
import Table from "react18-bootstrap/Table";
```

# Commit guidelines

1. <span style="color: red;">IMPORTANT</span> Setup sonarqube scanner [(refer here)](https://docs.sonarsource.com/sonarqube/9.9/analyzing-source-code/scanners/sonarscanner/) and run the following command `sonar-scanner` at the root directory

2. <span style="color: red;">IMPORTANT</span> Before commit please check if the build is passing by running `npm run build`

# Enable tailwind

- tailwind support in this project is only limited to react 18 development
- to enable the tailwind style usage in your module add the path to in the `tailwind.config.js` -> `content`
  - example if any component needs tailwind in usage dashboard then add the path

```tsx
// tailwind.config.js
{
    content: [
        ...
        "./src/components/usage-dashboard/**/*.{js,jsx,ts,tsx}",
    ],
}
```

<b>Note: </b> only the files under the path specfied will get the tailwind css, even if you try to import the CSS modules to the files outside of path specified then it wont work

# Known Issues

## a[e] is undefined

- on saving a new changes in any file of `react18`, there is error thrown from apex chart

```
a[e] is undefined from apexchart dist cjs
```

### solution

refresh the browser

### possible faulty modules to explore

- React hot reload module
- when the chunks are recreated and old chuncks are purged
