const lineByLine = require("n-readlines");

module.exports = {
  readlines(path, callback) {
    const liner = new lineByLine(path);

    let lineNumber = 1;
    while ((lineBuffer = liner.next())) {
      const line = lineBuffer.toString();
      callback(line, lineNumber);
      lineNumber++;
    }
  },
};
