#! /usr/bin/env node

import axios from 'axios'
import { program } from 'commander'
import { findOccurrences } from '../src/occurrences.js'
import { configuration } from '../src/configuration.js'

program.command('run').action((options) => {
  const occurrences = findOccurrences(configuration)
  console.log(occurrences)
})

program.command('push').action((options) => {
  const occurrences = findOccurrences(configuration)
  console.log(`Uploading ${occurrences.length} occurrences...`)
  axios
    .post('http://localhost:3000/api/occurrences.json', { occurrences: JSON.stringify(occurrences) })
    .then(({ data }) => console.log('Response:', data))
    .catch((error) => console.error(error.message))
})

program.parse(process.argv)
