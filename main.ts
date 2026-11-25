"use strict";

const fs = require("node:fs");
const path = require("node:path");

// ---------------------------------------------------------------------------
// The dog ate my homework — funniest excuse (v2)
// ---------------------------------------------------------------------------
// Voice: the dog, unrepentant, reframing the crime as a rescue mission.
// The homework was not eaten out of hunger. It was confiscated for the
// human's own good, after an hour of tears over question four. The dog
// expects gratitude, not detention.
// ---------------------------------------------------------------------------

function buildExcuse() {
  // Each clause is one beat of the dog's defence; joining them with a
  // single space reproduces the entry exactly, punctuation included.
  const beats = [
    "I didn't eat your homework,",
    "I rescued you from it.",
    "You cried over question four for an hour.",
    "You're welcome.",
  ];
  return beats.join(" ");
}

function checkEntry(text) {
  const problems = [];
  if (typeof text !== "string") {
    problems.push("not a string");
  } else {
    const glyphs = [...text].length;
    if (glyphs < 1 || glyphs > 200) {
      problems.push(`length ${glyphs} outside 1-200`);
    }
    if (/[\r\n]/.test(text)) {
      problems.push("must be a single line");
    }
    if (text.trim().length === 0) {
      problems.push("must not be blank");
    }
  }
  if (problems.length > 0) {
    throw new Error(`entry gate failed: ${problems.join("; ")}`);
  }
  return text;
}

function resolveOutputDir() {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (typeof fromEnv === "string" && fromEnv.trim().length > 0) {
    return fromEnv;
  }
  return "/output";
}

function emit(entry, dir) {
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, "entry.txt");
  // Buffer write: no trailing newline is appended, by construction.
  fs.writeFileSync(target, Buffer.from(entry, "utf8"));
  return target;
}

function main() {
  // The entry text is fixed byte-for-byte (108 chars); only the code
  // around it was rewritten for this v2 resubmit.
  const entry = checkEntry(buildExcuse());
  const dir = resolveOutputDir();
  const target = emit(entry, dir);
  process.stdout.write(`wrote ${entry.length} chars to ${target}\n`);
}

main();
