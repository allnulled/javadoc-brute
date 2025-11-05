const fs = require("fs");

const JavadocBrute = class {
  
  static assertion(condition, message) {
    if(!condition) {
      throw new Error(message);
    }
  }

  static async extractComments(options) {
    const globbyApi = await import("globby");
    const { globby } = globbyApi;
    this.assertion(typeof options === "object", "Parameter «options» must be an object on «extractComments»");
    const {
      include: _include,
      exclude: _exclude = [],
      output: _output
    } = options;
    this.assertion(Array.isArray(_include), "Parameter «options.include» must be an array on «extractComments»");
    this.assertion(Array.isArray(_exclude), "Parameter «options.exclude» must be an array on «extractComments»");
    this.assertion(["string", "undefined"].indexOf(typeof _output) !== -1, "Parameter «options.output» must be a string on «extractComments»");
    const patterns = [].concat(_include).concat(_exclude.map(it => "!" + it));
    const paths = await globby(patterns);
    let output = "";
    for (let indexFile = 0; indexFile < paths.length; indexFile++) {
      const file = paths[indexFile];
      const fileContents = fs.readFileSync(file).toString();
      const comments = this.extractCommentsFromString(fileContents);
      output += comments.join("\n\n");
      output += "\n\n";
    }
    if(_output) {
      fs.writeFileSync(_output, output, "utf8");
    } else {
      console.log(_output);
    }
    return output;
  }

  static extractCommentsFromString(text) {
    const regex = /\/\*\*([\s\S]*?)\*\//g;
    const results = [];
    let match;
    while ((match = regex.exec(text)) !== null) {
      const raw = match[1];
      const cleaned = raw
        .split('\n')
        .map(line => line.replace(/^\s*\* ?/, '').trimEnd())
        .join('\n')
        .trim();
      results.push(cleaned);
    }
    return results;
  }

};

module.exports = JavadocBrute;