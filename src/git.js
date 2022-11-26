import { execSync } from 'child_process'

const git = (cmd) => execSync(`git ${cmd}`).toString().split('\n').filter(Boolean)

export const trackedFiles = () => {
  const allFiles = git('ls-files')
  const deletedFiles = git('ls-files -d')

  return allFiles.filter((file) => !deletedFiles.includes(file))
}

export const sha = () => git('rev-parse HEAD')
