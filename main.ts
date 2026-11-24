// Seventeen Syllables of Debugging — haiku writer.
//
// Writes exactly one 5-7-5 haiku about debugging to /output/entry.txt.
// Each line is stored together with its expected syllable count and is
// validated at runtime before anything is written: if a count is wrong
// the program fails loudly instead of emitting a malformed haiku.

import { mkdirSync, writeFileSync } from "node:fs";

// Syllable counts for every word used in the haiku, so the 5-7-5 shape
// is checked from the words themselves rather than trusted blindly.
const SYLLABLES = {
  cursor: 2,
  blinks: 1,
  at: 1,
  three: 1,
  the: 1,
  trace: 1,
  ends: 1,
  where: 1,
  i: 1,
  began: 2,
  and: 1,
  bug: 1,
  was: 1,
  me: 1,
};

const LINES = [
  { text: "Cursor blinks at three", syllables: 5 },
  { text: "the trace ends where I began", syllables: 7 },
  { text: "and the bug was me", syllables: 5 },
];

function countSyllables(line) {
  let total = 0;
  for (const word of line.toLowerCase().split(/\s+/)) {
    const n = SYLLABLES[word];
    if (n === undefined) {
      throw new Error(`unknown word for syllable count: ${word}`);
    }
    total += n;
  }
  return total;
}

for (const line of LINES) {
  const actual = countSyllables(line.text);
  if (actual !== line.syllables) {
    throw new Error(
      `syllable mismatch on line "${line.text}": expected ${line.syllables}, got ${actual}`,
    );
  }
}

const haiku = LINES.map((line) => line.text).join("\n") + "\n";

if (haiku.length < 1 || haiku.length > 200) {
  throw new Error(`haiku length ${haiku.length} outside the 1-200 character gate`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku, "utf8");
