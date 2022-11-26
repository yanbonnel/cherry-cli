import glob from 'glob'
import { execSync } from 'child_process'

const getTrackedFiles = () => {
  try {
    return execSync('git ls-tree --full-tree --name-only -r HEAD').toString().split('\n').filter(Boolean)
  } catch {
    return glob.sync('**/*', { nodir: true })
  }
}

export default getTrackedFiles
