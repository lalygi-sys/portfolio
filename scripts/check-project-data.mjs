// Regression checks for the boundary between public CMS data and local presentation notes.
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const cache = new Map();
function load(file) {
  const absolute = path.resolve(file);
  if (cache.has(absolute)) return cache.get(absolute);
  const exports = {};
  cache.set(absolute, exports);
  const source = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const localRequire = (specifier) => {
    assert.ok(specifier.startsWith("@/"), "Only local presentation modules may be loaded");
    return load("src/" + specifier.slice(2) + ".ts");
  };
  new Function("require", "exports", source)(localRequire, exports);
  return exports;
}
const { getPublicProjects, projectFromCase, draftProjects, publicOutcome } =
  load("src/lib/projects.ts");
const row = {
  slug: "research-recruitment",
  title: "Improving research recruitment",
  summary: "Finding more reliable ways to recruit B2B research participants.",
  contribution: "Research planning and targeted invitations.",
  outcome: "Reduced recruitment time by approximately 60% while doubling participant numbers.",
  role: "Process Lead / Area Product Designer",
  period: "2025–2026",
  stage: "",
  published: true,
  featured: false,
  sort_order: 5,
  cover_path: null,
  mediaUrls: {},
  links: [],
};
assert.equal(projectFromCase(row).metrics[0].value, "−60%");
assert.equal(
  getPublicProjects([{ ...row, published: false }]).some((p) => p.slug === row.slug),
  false,
);
assert.equal(
  getPublicProjects([]).length,
  2,
  "No missing CMS case may be recreated from static metadata",
);
const edited = projectFromCase({
  ...row,
  title: "Edited title",
  summary: "",
  outcome: "Updated outcome",
  role: "Updated role",
  sort_order: 19,
  featured: true,
});
assert.equal(edited.title, "Edited title");
assert.equal(edited.summary, "");
assert.equal(edited.outcome, "Updated outcome");
assert.equal(edited.metrics.length, 0, "Default metrics must not contradict an edited CMS outcome");
assert.equal(edited.role, "Updated role");
assert.equal(edited.sortOrder, 19);
assert.equal(edited.featured, true);
const uploaded = projectFromCase({
  ...row,
  cover_path: "custom.webp",
  mediaUrls: { "custom.webp": "https://example.com/custom.webp" },
});
assert.equal(uploaded.coverImage, "https://example.com/custom.webp");
assert.equal(uploaded.localCover, false);
for (const draft of draftProjects) {
  assert.equal(
    getPublicProjects([{ ...row, slug: draft.slug }]).some((p) => p.slug === draft.slug),
    false,
  );
}
const rebate = {
  ...row,
  slug: "b2b-rebates-payouts",
  outcome:
    "An interim solution was implemented. The automated flow was refined with partners and prepared for development and a pilot; prevention of $XXXk in losses was an estimate.",
};
assert.equal(publicOutcome(rebate).includes("$XXX"), false);
assert.equal(publicOutcome({ ...rebate, outcome: "New editor content" }), "New editor content");
for (const project of getPublicProjects([row])) {
  if (!project.localCover) continue;
  assert.ok(fs.existsSync("public" + project.coverImage));
  assert.ok(fs.existsSync("public" + project.coverImage.replace(".webp", "-640.webp")));
  assert.ok(project.coverAlt);
}
console.log(
  "PASS: publication boundary, drafts, CMS overrides, metrics, uploaded covers, local assets and public outcome.",
);
