import { mkdirSync, writeFileSync } from "node:fs";

// One haiku about debugging, 5-7-5.
// Cursor blinks at three (5) / the trace ends where I began (7) /
// and the bug was me (5). The last line turns the poem: the hunted bug
// turns out to be the one doing the hunting.
const haiku = [
  "Cursor blinks at three",
  "the trace ends where I began",
  "and the bug was me",
].join("\n");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", haiku + "\n", "utf8");
