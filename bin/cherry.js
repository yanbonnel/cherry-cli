#! /usr/bin/env node

import axios from 'axios'
import { program } from 'commander'
import { findOccurrences } from '../src/occurrences.js'
import { configuration } from '../src/configuration.js'

const API_BASE_URL = 'http://localhost:3000/api' // TODO: convert to production url

program.command('run').action((options) => {
  const occurrences = findOccurrences(configuration)
  console.log(occurrences)
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
