import test from "node:test";
import assert from "node:assert/strict";
import {
  defaultProfile,
  normalizeProfile,
  readProfile,
  safeLinkedIn,
  isValidEmail,
  resumeText,
  STORAGE_KEY,
  isEditorRequest,
  publishedProfile,
} from "./profile.js";

test("defaults contain only profile-based work and no invented contact address", () => {
  assert.equal(defaultProfile.email, "");
  assert.equal(defaultProfile.projects.length, 3);
  assert.equal(defaultProfile.experience[1].dates, "Previously");
});

test("normalization preserves editable content without accepting arbitrary structure", () => {
  const profile = normalizeProfile({
    name: "Test Engineer",
    theme: "dark",
    accent: "forest",
    projects: [{ title: "New story", id: "unsafe", category: "fake" }],
    experience: [{ company: "Example company" }],
  });
  assert.equal(profile.name, "Test Engineer");
  assert.equal(profile.theme, "dark");
  assert.equal(profile.accent, "forest");
  assert.equal(profile.projects[0].title, "New story");
  assert.equal(profile.projects[0].id, "enterprise");
  assert.equal(profile.projects[0].category, "Engineering");
  assert.equal(profile.projects.length, 3);
  assert.equal(profile.experience[0].company, "Example company");
});

test("invalid or oversized imported fields safely fall back or are bounded", () => {
  const profile = normalizeProfile({
    name: "a".repeat(5000),
    role: {},
    theme: "unknown",
    accent: "__proto__",
    projects: [null],
  });
  assert.equal(profile.name.length, 1000);
  assert.equal(profile.role, defaultProfile.role);
  assert.equal(profile.theme, "light");
  assert.equal(profile.accent, "terracotta");
  assert.equal(profile.projects[0].title, defaultProfile.projects[0].title);
  assert.deepEqual(normalizeProfile(null), defaultProfile);
});

test("LinkedIn links reject executable protocols and misleading hosts", () => {
  for (const url of [
    "javascript:alert(1)",
    "https://linkedin.com.evil.example/in/test",
    "https://evil.example",
    "http://linkedin.com/in/test",
    "https://user:password@linkedin.com/in/test",
  ]) {
    assert.equal(safeLinkedIn(url), defaultProfile.linkedin);
  }
  assert.equal(
    safeLinkedIn("https://www.linkedin.com/in/test/"),
    "https://www.linkedin.com/in/test/",
  );
});

test("browser storage restores settings and recovers from corruption or unavailable storage", () => {
  assert.equal(
    readProfile({
      getItem(key) {
        assert.equal(key, STORAGE_KEY);
        return '{"name":"Saved name","accent":"ocean"}';
      },
    }).name,
    "Saved name",
  );
  assert.equal(
    readProfile({
      getItem() {
        return "not json";
      },
    }).name,
    defaultProfile.name,
  );
  assert.equal(
    readProfile({
      getItem() {
        throw new Error("denied");
      },
    }).name,
    defaultProfile.name,
  );
});

test("export and reimport retain supported customizations", () => {
  const profile = normalizeProfile({
    ...defaultProfile,
    name: "Custom Name",
    headline: "Custom\nHeadline",
    accent: "indigo",
    email: "hello@example.com",
    layout: "studio",
    motion: "off",
  });
  assert.deepEqual(
    normalizeProfile(JSON.parse(JSON.stringify(profile))),
    profile,
  );
});

test("layout and motion options are normalized and old exports remain compatible", () => {
  const studio = normalizeProfile({ layout: "studio", motion: "off" });
  assert.equal(studio.layout, "studio");
  assert.equal(studio.motion, "off");
  for (const input of [
    {},
    { layout: "unknown", motion: "infinite" },
    { layout: {}, motion: null },
  ]) {
    const profile = normalizeProfile(input);
    assert.equal(profile.layout, "editorial");
    assert.equal(profile.motion, "subtle");
  }
});

test("editor requires an explicit edit=1 request", () => {
  assert.equal(isEditorRequest("?edit=1"), true);
  assert.equal(isEditorRequest("?other=ok&edit=1"), true);
  for (const query of ["", "?edit", "?edit=true", "?admin=1", "?edit=0"]) {
    assert.equal(isEditorRequest(query), false);
  }
});

test("editor falls back to published settings, including after draft storage failure", () => {
  const published = normalizeProfile({
    name: "Published owner",
    layout: "studio",
    motion: "off",
  });
  for (const value of [null, "broken-json"]) {
    assert.deepEqual(
      readProfile({ getItem: () => value }, published),
      published,
    );
  }
  assert.deepEqual(
    readProfile(
      {
        getItem() {
          throw new Error("Blocked");
        },
      },
      published,
    ),
    published,
  );
  const draft = readProfile(
    { getItem: () => '{"name":"Draft owner"}' },
    published,
  );
  assert.equal(draft.name, "Draft owner");
  assert.equal(draft.layout, "studio");
  assert.equal(draft.motion, "off");
  assert.deepEqual(normalizeProfile(publishedProfile), publishedProfile);
});

test("email validation excludes empty or malformed addresses", () => {
  assert.equal(isValidEmail("hello@example.com"), true);
  for (const email of [
    "",
    "name",
    "no@domain",
    "two words@example.com",
    "hello@example.com\nBcc:other@example.com",
  ])
    assert.equal(isValidEmail(email), false);
});

test("recruiter resume contains current customized profile and professional history", () => {
  const profile = normalizeProfile({
    ...defaultProfile,
    name: "Custom Name",
    email: "hello@example.com",
  });
  const text = resumeText(profile);
  for (const expected of [
    "Custom Name",
    "hello@example.com",
    "Qualysoft",
    "PT Nawa Data Solutions",
    "TECHNOLOGIES",
    "SELECTED WORK & RESEARCH",
    "IEEE publication",
  ])
    assert.ok(text.includes(expected));
});
