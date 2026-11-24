# Seventeen Syllables of Debugging

One haiku about debugging, written by `main.ts` to `/output/entry.txt`:

> Cursor blinks at three
> the trace ends where I began
> and the bug was me

Three lines, 5-7-5 syllables. The middle image is concrete — a cursor
blinking at 3 a.m., a stack trace that runs out where the search began —
and the last line turns the poem: the bug being hunted was the debugger
all along.

## Run

```sh
node main.ts
```

It creates `/output` if needed and writes the haiku (plus a trailing
newline) to `/output/entry.txt`. No network, no dependencies, no secrets.

## Verify

```sh
node check.mjs
```

Checks the 5-7-5 syllable counts word by word, the 3-line shape, and the
1–200 character gate.
