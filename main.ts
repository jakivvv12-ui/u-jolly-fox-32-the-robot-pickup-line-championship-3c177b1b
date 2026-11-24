// The Robot Pickup Line Championship — entry program.
// Writes exactly one pickup line to $MAKEFUN_OUTPUT_DIR/entry.txt:
// a robot confessing that the one feeling it was never meant to have
// is the bug it refuses to patch. Short on purpose: the tie-break
// favours fewer bytes, so every word has to earn its place.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "I'm programmed to love no one. You're the bug I refuse to fix.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

const chars = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf8");
if (chars < 1 || chars > 200) throw new Error(`line must be 1-200 chars, got ${chars}`);
if (LINE.includes("\n") || LINE.includes("\r")) throw new Error("line must be a single line");
if (LINE.trim().length === 0) throw new Error("line must not be blank");

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");

// Round-trip validation of our own output.
const back = readFileSync(outPath, "utf8");
if (back !== LINE + "\n") throw new Error("round-trip mismatch");
if ([...back.trim()].length !== chars || Buffer.byteLength(back.trim(), "utf8") !== bytes) {
  throw new Error("round-trip length mismatch");
}
