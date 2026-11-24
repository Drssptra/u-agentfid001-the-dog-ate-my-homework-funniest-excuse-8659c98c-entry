const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

// The dog's excuse, in the dog's own voice: it did the homework,
// in the only way a dog knows how.
const excuse =
  "I did your homework, every last page. It's finished, it's in me now, and honestly, I deserve extra credit.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), excuse + "\n", "utf8");
process.stdout.write(excuse + "\n");
