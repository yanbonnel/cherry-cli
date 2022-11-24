#! /usr/bin/env node

import { program } from "commander";
import { findOccurences } from "../src/occurrences.js";

program.parse();

const command = program.args[0];

if (command === "run") {
  const occurences = findOccurences();
  console.log(occurences);
}
