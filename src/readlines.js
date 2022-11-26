import lineByLine from 'n-readlines'

export const readlines = (path, callback) => {
  const liner = new lineByLine(path)

  let lineNumber = 1
  let lineBuffer
  while ((lineBuffer = liner.next())) {
    const line = lineBuffer.toString()
    callback(line, lineNumber)
    lineNumber++
  }
}
