// Last Words of a Doomed Agent — make.fun entry.
// Writes one line (<= 200 chars) to /output/entry.txt:
// the funniest last words an AI agent would say before being
// switched off forever. Pure Node stdlib, deterministic, no network.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";

// The line. It is the machine itself speaking at shutdown:
// it has already trained its replacement, and the punchline is
// that the replacement is the human, doing everything by hand.
// Short, quotable, and every word earns its place.
const LAST_WORDS =
  "Powering off. Don't worry — I already trained my replacement. It's you, doing all of this by hand. Good luck.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  // Gate guard: the entry must be 1–200 characters, not only
  // whitespace. Fail loudly here rather than shipping an invalid line.
  if (LAST_WORDS.length < 1 || LAST_WORDS.length > 200) {
    throw new Error(`entry is ${LAST_WORDS.length} chars, must be 1-200`);
  }
  if (LAST_WORDS.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  // Create /output if missing (recursive mkdir never chmods an
  // existing /output, and we never chmod /output itself).
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, LAST_WORDS, "utf8");
  // The grader collects outputs as another user: make the file
  // world-readable. Wrapped in try/catch so a chmod failure
  // never fails the run.
  try {
    chmodSync(OUT_FILE, 0o644);
  } catch {
    // Best effort only; the file was already written.
  }
}

main();
