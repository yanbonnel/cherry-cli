import { getRepo, getMetrics } from './configuration.js'
import glob from 'glob'
import { readlines } from './readlines.js'
import Codeowners from './owners.js'

const owners = new Codeowners()

export const findOccurrences = (configuration) => {
  const occurrences = []
  const metrics = getMetrics(configuration)
  const files = glob.sync('**/*', {
    ignore: ['node_modules/**', 'tmp/**', 'log/**'], // TODO: we should also ignore ignored files from the project
    nodir: true,
  })

  files.forEach((filePath) => {
    metrics.forEach(({ name, pattern }) => {
      readlines(filePath, (line, lineNumber) => {
        if (!line.match(pattern)) return

        occurrences.push({
          commit_sha: 'master', // TODO: use current commit sha instead
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
