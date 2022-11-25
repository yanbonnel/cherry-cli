import configuration from "../configuration.js";
import glob from "glob";
import { readlines } from "./readlines.js";

import Codeowners from "./owners.js";

const repos = new Codeowners();

export const findOccurrences = () => {
  const occurrences = [];
  const files = glob.sync("**/*.js", {
    ignore: "node_modules/**",
    nodir: true,
  });

  files.forEach((filePath) => {
    Object.entries(configuration).forEach(([metricName, configuration]) => {
      readlines(filePath, (line, lineNumber) => {
        if (!line.match(configuration.pattern)) return;

        occurrences.push({
          commit_sha: "1234567890", // TODO: extract current commit sha
          file_path: filePath,
          line_number: lineNumber,
          line_content: line.trim(),
          repo: "cherrypush/cherry-cli", // TODO: add repo to configuration file
          owners: repos.getOwner(filePath),
          metric_name: metricName,
        });
      });
    });
  });

  return occurrences;
};
