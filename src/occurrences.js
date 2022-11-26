import { getRepo, getMetrics } from "./configuration.js";
import glob from "glob";
import { readlines } from "./readlines.js";

import Codeowners from "./owners.js";

const repos = new Codeowners();

export const findOccurrences = (configuration) => {
  const occurrences = [];
  const metrics = getMetrics(configuration);
  const files = glob.sync("**/*.js", {
    ignore: "node_modules/**",
    nodir: true,
  });

  files.forEach((filePath) => {
    metrics.forEach(({ name, pattern }) => {
      readlines(filePath, (line, lineNumber) => {
        if (!line.match(pattern)) return;

        occurrences.push({
          commit_sha: "1234567890", // TODO: extract current commit sha
          file_path: filePath,
          line_number: lineNumber,
          line_content: line.trim(),
          repo: getRepo(configuration),
          owners: repos.getOwner(filePath),
          metric_name: name,
        });
      });
    });
  });

  return occurrences;
};
