#! /usr/bin/env node

import axios from "axios";
import { program } from "commander";
import { findOccurrences } from "../src/occurrences.js";

program.parse();

const command = program.args[0];

if (command === "run") {
  const occurrences = findOccurrences();
  console.log(occurrences);
}

if (command === "push") {
  const occurrences = findOccurrences();

  console.log(`Uploading ${occurrences.length} occurrences...`);

  axios
    .post("http://localhost:3000/api/occurrences.json", {
      occurrences: JSON.stringify(occurrences),
    })
    .then(({ data }) => console.log("Response:", data));
}
