#! /usr/bin/env node

import fs from 'fs'
import axios from 'axios'
import { program } from 'commander'
import { findOccurrences } from '../src/occurrences.js'
import { configuration } from '../src/configuration.js'

const API_BASE_URL = 'https://www.cherrypush.com/api'

program.command('run').action((options) => {
  const occurrences = findOccurrences(configuration)
  console.log(occurrences)
  console.log(`There are ${occurrences.length} occurrences ready to be reported.`)
  console.log('Run `cherry push` to push them to your public dashboard.')
})

program.command('store')
  .option('-f, --file [file]', 'Specify output file (default cherry.json)')
  .option('-p --pretty', 'Prettify output (default false)')
  .action((options) => {
    const outputFile = options.file || 'cherry.json'
    const pretty = !!options.pretty
    const occurrences = findOccurrences(configuration)
    console.log(`Saving ${occurrences.length} occurrences...`)
    fs.writeFileSync(outputFile, JSON.stringify(occurrences, null, pretty ? 4 : undefined))
  })

program.command('push').action((options) => {
  const occurrences = findOccurrences(configuration)
  console.log(`Uploading ${occurrences.length} occurrences...`)
  axios
    .post(API_BASE_URL + '/occurrences', { occurrences: JSON.stringify(occurrences) })
    .then(({ data }) => console.log('Response:', data))
    .catch((error) => console.error(error.message))
})

program.parse(process.argv)
