
const main = async function () {
  
  const JavadocBrute = require(__dirname + "/javadoc-brute.js");

  const comments = await JavadocBrute.extractComments({
    include: [__dirname + "/test/test-1/**/*.js"],
    exclude: [__dirname + "/test/test-1/not/**/*.js"],
    output: __dirname + "/test/output1.md",
  });

  console.log(comments);

};

main();