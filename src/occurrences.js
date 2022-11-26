import { getRepo, getMetrics } from './configuration.js'
import { readlines } from './readlines.js'
import Codeowners from './owners.js'
import * as git from './git.js'

const owners = new Codeowners()

export const findOccurrences = (configuration) => {
  const occurrences = []
  const metrics = getMetrics(configuration)

  const sha = git.sha()
  git.trackedFiles().forEach((filePath) => {
    metrics.forEach(({ name, pattern }) => {
      readlines(filePath, (line, lineNumber) => {
        if (!line.match(pattern)) return

        occurrences.push({
          commit_sha: sha,
          file_path: filePath,
          line_number: lineNumber,
          line_content: line.trim().slice(0, 120).replace(/\0/, ''),
          repo: getRepo(configuration),
          owners: owners.getOwner(filePath),
          metric_name: name,
        })
      })
    })
  })

  return occurrences
}
