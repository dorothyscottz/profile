export const STORAGE_KEY = "farhan-portfolio-v1";
export const accents = {
  terracotta: { label: "Terracotta", color: "#b64f33", soft: "#f3e6de" },
  forest: { label: "Forest", color: "#366348", soft: "#e3ece3" },
  indigo: { label: "Indigo", color: "#5b58a0", soft: "#eae8f3" },
  ocean: { label: "Ocean", color: "#286f84", soft: "#e1edf0" },
};

export const defaultProfile = {
  name: "Muhammad Farhan",
  role: "Full-Stack Engineer",
  location: "Jakarta, Indonesia",
  headline: "Thoughtful code.\nMeaningful impact.",
  bio: "I turn complex problems into reliable, human-centered digital experiences. Currently building enterprise solutions at Qualysoft.",
  about:
    "I’m Farhan, a full-stack developer and Informatics graduate who cares about what happens on both sides of the screen. I enjoy making complex systems feel simple, dependable, and intuitive.\n\nFrom supporting live production environments to building enterprise applications with multinational teams, I bring curiosity, care, and a practical approach to every challenge.",
  email: "",
  linkedin: "https://www.linkedin.com/in/muhammad-farhan-21a787134/",
  status: "Open to meaningful conversations",
  accent: "terracotta",
  theme: "light",
  projects: [
    {
      id: "enterprise",
      category: "Engineering",
      label: "ENTERPRISE ENGINEERING",
      title: "Complex systems. Clear solutions.",
      description:
        "Building and evolving mission-critical enterprise applications with reliability at their core.",
      detail:
        "At Qualysoft, I contribute to the development, maintenance, and optimization of large-scale internal systems within Indonesia’s central tax authority. My work spans .NET backends and Angular frontends, with a focus on modular, maintainable applications.\n\nI collaborate with cross-functional, multinational teams on microservices, event-driven communication, and Domain-Driven Design. The goal: dependable software that supports complex organizational operations.",
      tags: ["Angular", ".NET", "Microservices"],
      note: "Professional contribution · Qualysoft",
    },
    {
      id: "reliability",
      category: "Engineering",
      label: "PRODUCTION & RELIABILITY",
      title: "Keeping the important things running.",
      description:
        "Turning production challenges into stable, dependable experiences for real-world users.",
      detail:
        "As a Customer Engineer at PT Nawa Data Solutions, I supported clients by diagnosing and resolving production-level challenges across multiple projects.\n\nThat experience shaped how I build today: investigate the underlying problem, prioritize reliability, and work closely with the people who depend on the software. This is an overview of my professional contribution, not a publicly released product.",
      tags: ["Troubleshooting", "System stability"],
      note: "Professional contribution · Nawa Data Solutions",
    },
    {
      id: "research",
      category: "Research",
      label: "TECHNOLOGY FOR GOOD",
      title: "Listening for a healthier future.",
      description:
        "Exploring machine learning to detect heart valve disease through phonocardiogram signals.",
      detail:
        "I co-authored the IEEE publication “Detecting Heart Valve Disease Using Support Vector Machine Algorithm based on Phonocardiogram Signal.”\n\nThe research explores a data-driven approach to healthcare using phonocardiogram signals and a Support Vector Machine algorithm. It reflects my interest in applying technology to meaningful, real-world problems. Publication details are available through my LinkedIn profile.",
      tags: ["Machine learning", "IEEE publication"],
      note: "Academic research · Co-author",
    },
  ],
  experience: [
    {
      company: "Qualysoft",
      role: "Full Stack Developer",
      dates: "Sep 2023 — Present",
      description:
        "Developing and enhancing large-scale enterprise systems with .NET and Angular. Collaborating across multinational teams to build reliable, maintainable software.",
      tags: [".NET", "Angular", "Domain-Driven Design"],
      current: true,
    },
    {
      company: "PT Nawa Data Solutions",
      role: "Customer Engineer",
      dates: "Previously",
      description:
        "Supporting diverse clients by investigating and resolving production issues, improving system stability, and keeping critical applications running.",
      tags: ["Production support", "Problem solving"],
      current: false,
    },
  ],
};

const text = (value, fallback, max = 3000) =>
  typeof value === "string" ? value.slice(0, max) : fallback;
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
export function safeLinkedIn(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      ["linkedin.com", "www.linkedin.com"].includes(url.hostname) &&
      !url.username &&
      !url.password
      ? url.href
      : defaultProfile.linkedin;
  } catch {
    return defaultProfile.linkedin;
  }
}
export function normalizeProfile(value) {
  const input = value && typeof value === "object" ? value : {};
  const profile = { ...defaultProfile };
  for (const key of [
    "name",
    "role",
    "location",
    "headline",
    "bio",
    "about",
    "status",
  ]) {
    profile[key] = text(
      input[key],
      defaultProfile[key],
      key === "about" ? 6000 : 1000,
    );
  }
  profile.email = text(input.email, "", 254);
  profile.linkedin = safeLinkedIn(input.linkedin);
  profile.accent = Object.hasOwn(accents, input.accent)
    ? input.accent
    : "terracotta";
  profile.theme = input.theme === "dark" ? "dark" : "light";
  profile.projects = defaultProfile.projects.map((project, i) => {
    const item = input.projects?.[i] ?? {};
    return {
      ...project,
      ...Object.fromEntries(
        ["title", "description", "detail", "note"].map((key) => [
          key,
          text(item[key], project[key]),
        ]),
      ),
    };
  });
  profile.experience = defaultProfile.experience.map((experience, i) => {
    const item = input.experience?.[i] ?? {};
    return {
      ...experience,
      ...Object.fromEntries(
        ["company", "role", "dates", "description"].map((key) => [
          key,
          text(item[key], experience[key]),
        ]),
      ),
    };
  });
  return profile;
}

export function readProfile(storage) {
  try {
    return normalizeProfile(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch {
    return normalizeProfile(null);
  }
}

export function resumeText(profile) {
  return `${profile.name}\n${profile.role}\n${profile.location}\n${profile.email ? `${profile.email}\n` : ""}${profile.linkedin}\n\nPROFILE\n${profile.bio}\n\nEXPERIENCE\n${profile.experience.map((e) => `${e.role} | ${e.company}\n${e.dates}\n${e.description}`).join("\n\n")}\n\nSELECTED WORK & RESEARCH\n${profile.projects.map((p) => `${p.title}\n${p.note}\n${p.description}\n${p.tags.join(" · ")}`).join("\n\n")}\n\nTECHNOLOGIES\nAngular · React · TypeScript · .NET · C# · SQL · Microservices · Domain-Driven Design\n\nABOUT\n${profile.about}\n`;
}
