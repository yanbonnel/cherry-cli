import configuration from "../configuration.js";
import glob from "glob";
import { readlines } from "./readlines.js";

import Codeowners from "./owners.js";

const repos = new Codeowners();

export const findOccurences = () => {
  const occurrences = {};
  const files = glob.sync("**/*.js", {
    ignore: "node_modules/**",
    nodir: true,
  });

  files.forEach((filePath) => {
    Object.entries(configuration).forEach(([metricName, configuration]) => {
      occurrences[metricName] = occurrences[metricName] || [];
      readlines(filePath, (line, lineNumber) => {
        if (!line.match(configuration.pattern)) return;

        occurrences[metricName].push({
          sha: "1234567890",
          file_path: filePath,
          line_number: lineNumber,
          line_content: line.trim(),
          owners: repos.getOwner(filePath),
        });
      });
    });
  });

  return occurrences;
};
