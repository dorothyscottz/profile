import assert from "node:assert/strict";
import { readFile, readdir, access } from "node:fs/promises";

const base = process.env.VITE_BASE_PATH || "/";
const html = await readFile("dist/index.html", "utf8");
const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith("/") && !url.startsWith("//"));
assert.ok(urls.length > 0, "Built page must reference local assets");
for (const url of urls) {
  assert.ok(url.startsWith(base), `Incorrect asset base: ${url}`);
  await access(`dist/${url.slice(base.length)}`);
}

const scripts = (await readdir("dist/assets")).filter((file) =>
  file.endsWith(".js"),
);
assert.ok(scripts.length > 0, "Production JavaScript must exist");
const bundle = (
  await Promise.all(
    scripts.map((file) => readFile(`dist/assets/${file}`, "utf8")),
  )
).join("\n");
for (const editorText of [
  "Customize your portfolio",
  "Editor preview",
  "Your portfolio settings have been imported.",
]) {
  assert.ok(
    !bundle.includes(editorText),
    `Development editor leaked into production: ${editorText}`,
  );
}
console.log(
  "Production assets exist at the configured base; development editor code is excluded.",
);
