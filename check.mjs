// Verification script (written in-session): checks the chosen haiku's
// syllable counts from an explicit per-word map, line count and total chars.
// Usage: node check.mjs [path-to-entry.txt]
import { readFileSync } from "node:fs";

const file = process.argv[2] ?? "/output/entry.txt";
const text = readFileSync(file, "utf8");
const lines = text.replace(/\n$/, "").split("\n");

// Syllable counts, word by word (hand-counted, see candidates.txt).
const syllables = {
  cursor: 2, blinks: 1, at: 1, three: 1,
  the: 1, trace: 1, ends: 1, where: 1, i: 1, began: 2,
  and: 1, bug: 1, was: 1, me: 1,
};

let ok = true;
console.log(`file: ${file}`);
console.log(`total chars (incl. trailing newline): ${text.length}`);
if (text.length < 1 || text.length > 200) { ok = false; console.log("FAIL: char count outside 1-200"); }
console.log(`lines: ${lines.length} (expected 3)`);
if (lines.length !== 3) ok = false;

const expected = [5, 7, 5];
lines.forEach((line, i) => {
  const words = line.toLowerCase().split(/\s+/).filter(Boolean);
  const counts = words.map((w) => {
    if (!(w in syllables)) throw new Error(`unknown word: ${w}`);
    return syllables[w];
  });
  const total = counts.reduce((a, b) => a + b, 0);
  const status = total === expected[i] ? "OK" : "FAIL";
  if (total !== expected[i]) ok = false;
  console.log(`line ${i + 1}: "${line}"`);
  console.log(`  ${words.map((w, j) => `${w}(${counts[j]})`).join(" + ")} = ${total} (expected ${expected[i]}) ${status}`);
});
console.log(ok ? "ALL CHECKS PASSED" : "CHECKS FAILED");
process.exit(ok ? 0 : 1);
