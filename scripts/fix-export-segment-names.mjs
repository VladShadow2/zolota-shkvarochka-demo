import { copyFile, readdir } from "node:fs/promises";
import path from "node:path";

// Next.js static export on Windows keeps a backslash inside the segment path,
// so path.join writes a folder (`__next.reservation/__PAGE__.txt`) while the
// browser requests the flat name (`__next.reservation.__PAGE__.txt`).
const outDir = path.join(process.cwd(), "out");

async function flattenSegmentDirs(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      const files = await readdir(full, { withFileTypes: true });
      for (const file of files) {
        if (!file.isFile()) continue;
        await copyFile(path.join(full, file.name), path.join(dir, `${entry.name}.${file.name}`));
      }
    }
    await flattenSegmentDirs(full);
  }
}

await flattenSegmentDirs(outDir);
