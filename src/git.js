import { execSync } from 'child_process'

const git = (cmd) => execSync(`git ${cmd}`).toString().split('\n').filter(Boolean)

export const files = () => {
  const trackedFiles = git('ls-files')
  const untrackedFiles = git('ls-files --others --exclude-standard')
  const deletedFiles = git('ls-files -d')

  return trackedFiles.concat(untrackedFiles).filter((file) => !deletedFiles.includes(file))
}

export const sha = () => git('rev-parse HEAD')
