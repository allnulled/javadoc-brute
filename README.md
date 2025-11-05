# javadoc-brute

Extracts javadoc-like comments and puts them together.

## Installation

```bash
npm install -s @allnulled/javadoc-brute
```

## Usage

You can use it by API or command line.

### Command line usage

```bash
npx @allnulled/javadoc-brute
  --include "glob/path/**/*.js"
  --exclude "node_modules/**/*.js"
  --output "REFERENCE.md"
```

### API usage

```js
const JavadocBrute = require("@allnulled/javadoc-brute");

await JavadocBrute.extractComments({
  include: ["glob/path/**/*.js"],
  exclude: ["node_modules/**/*.js"],
  output: "output.md"
});
```