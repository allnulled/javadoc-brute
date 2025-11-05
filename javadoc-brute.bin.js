#!/usr/bin/env node

const path = require("path");
const javadocPath = path.resolve(__dirname, "javadoc-brute.js");

const compileArgs = function(argv = process.argv.slice(2)) {
  const result = { _: [] };
  let i = 0;
  while (i < argv.length) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      if (value !== undefined) {
        result[key] = [value];
      } else {
        const values = [];
        let j = i + 1;
        while (j < argv.length && !argv[j].startsWith('-')) {
          values.push(argv[j]);
          j++;
        }
        if (values.length === 0) {
          result[key] = true;
        } else if (values.length === 1) {
          result[key] = values[0];
        } else {
          result[key] = values;
        }
        i = j - 1; // saltar los valores consumidos
      }
    } else {
      result._.push(arg);
    }
    i++;
  }
  return result;
};

const main = async function () {
  const args = compileArgs();
  const { include: _include, exclude: _exclude, output: _output } = args;
  const JavadocBrute = require(javadocPath);
  const allComments = await JavadocBrute.extractComments({
    include: [].concat(_include),
    exclude: [].concat(_exclude),
    output: _output,
  });
  console.log(allComments);
};

main();