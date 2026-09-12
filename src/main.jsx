import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowDown,
  SlidersHorizontal,
  MapPin,
  Download,
  X,
  Check,
  Linkedin,
  Copy,
  Mail,
  Code2,
  Layers3,
  Globe2,
  Heart,
  ChevronRight,
  Sun,
  Moon,
  RotateCcw,
  Upload,
  Menu,
  FileText,
  Printer,
  Braces,
  Sparkles,
  CheckCheck,
  CircleDot,
} from "lucide-react";
import {
  accents,
  publishedProfile,
  isEditorRequest,
  normalizeProfile,
  readProfile,
  resumeText,
  STORAGE_KEY,
  isValidEmail,
} from "./profile";
import "./styles.css";
import "./studio.css";
import "./motion.css";
import { useMotion } from "./useMotion";

// The published build has no editor entry point or local draft loading.
const editorMode =
  import.meta.env.DEV && isEditorRequest(window.location.search);

const skills = [
  "Angular",
  "React",
  "TypeScript",
  ".NET",
  "C#",
  "SQL",
  "Microservices",
  "Domain-Driven Design",
];

function download(content, filename, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Modal({ children, title, onClose, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      dialog.close();
      previous?.focus();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-inner">
        <button
          className="icon-button close-modal"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </dialog>
  );
}

function HeroArt() {
  const [mode, setMode] = useState("build");
  return (
    <div
      className={`hero-art art-${mode}`}
      aria-label="Interactive engineering illustration"
    >
      <div className="art-grid" />
      <span className="art-coordinate top">01 / IDEAS INTO IMPACT</span>
      <span className="art-coordinate bottom">
        CRAFTED WITH CARE, BUILT TO LAST
      </span>
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orb">
        <div className="orb-ring" />
        <div className="orb-shine" />
      </div>
      <div className="code-window">
        <div className="code-top">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <span>the-way-i-work.ts</span>
          <Code2 size={13} />
        </div>
        <div className="code-content">
          <div>
            <span className="line-no">01</span>
            <span className="syntax-muted">
              // Good things start with a purpose.
            </span>
          </div>
          <div>
            <span className="line-no">02</span>
            <span className="syntax-purple">const</span>{" "}
            <span className="syntax-cream">engineer</span> = {"{"}
          </div>
          <div>
            <span className="line-no">03</span>&nbsp; mindset:{" "}
            <span className="syntax-green">'curious'</span>,
          </div>
          <div>
            <span className="line-no">04</span>&nbsp; approach:{" "}
            <span className="syntax-green">'human-first'</span>,
          </div>
          <div>
            <span className="line-no">05</span>&nbsp; focus:{" "}
            <span className="syntax-green">
              '{mode === "build" ? "meaningful impact" : "lasting reliability"}'
            </span>
          </div>
          <div>
            <span className="line-no">06</span>
            {"}"};
          </div>
          <div className="empty-line">
            <span className="line-no">07</span>
          </div>
          <div>
            <span className="line-no">08</span>
            <span className="syntax-cream">
              {mode === "build"
                ? "buildSomethingMeaningful"
                : "makeItDependable"}
            </span>
            (engineer);
          </div>
        </div>
        <div className="code-status">
          <span>
            <i />{" "}
            {mode === "build"
              ? "Always learning. Always building."
              : "Reliable by intention, not by chance."}
          </span>
          <span>TypeScript</span>
        </div>
      </div>
      <div className="craft-card">
        <span className="craft-icon">
          {mode === "build" ? <Layers3 size={23} /> : <CheckCheck size={23} />}
        </span>
        <div>
          <strong>
            {mode === "build"
              ? "From idea to impact"
              : "Built for the real world"}
          </strong>
          <span>
            {mode === "build"
              ? "Frontend. Backend. Everything between."
              : "Thoughtful details. Dependable systems."}
          </span>
        </div>
        <span className="craft-spark">✳</span>
      </div>
      <div className="art-switch" aria-label="Illustration mode">
        <button
          className={mode === "build" ? "selected" : ""}
          onClick={() => setMode("build")}
          aria-pressed={mode === "build"}
        >
          <Braces size={13} /> Build
        </button>
        <button
          className={mode === "reliability" ? "selected" : ""}
          onClick={() => setMode("reliability")}
          aria-pressed={mode === "reliability"}
        >
          <CircleDot size={13} /> Refine
        </button>
      </div>
      <div className="art-star" aria-hidden="true">
        ✳
      </div>
    </div>
  );
}

function ProjectArt({ id, large = false }) {
  return (
    <div
      className={`project-art project-art-${id} ${large ? "large-art" : ""}`}
      aria-hidden="true"
    >
      {id === "enterprise" && (
        <>
          <span className="visual-caption">CONNECTED BY DESIGN</span>
          <div className="architecture">
            <div className="architecture-node node-top">
              <Globe2 size={17} />
              <span>Experience layer</span>
              <i />
            </div>
            <div className="connector" />
            <div className="architecture-row">
              <div className="architecture-node">
                <Braces size={17} />
                <span>Application</span>
              </div>
              <div className="architecture-node">
                <Layers3 size={17} />
                <span>Services</span>
              </div>
            </div>
            <div className="architecture-bottom">
              <span />
              <span />
              <span />
            </div>
          </div>
          <span className="visual-corner">01 — SYSTEMS</span>
        </>
      )}
      {id === "reliability" && (
        <>
          <span className="visual-caption">RELIABILITY, NOT BY CHANCE</span>
          <div className="health-window">
            <div className="health-header">
              <span>
                <i /> System health
              </span>
              <span>Live overview</span>
            </div>
            <div className="health-body">
              <span>Application status</span>
              <strong>
                Operational <Check size={14} />
              </strong>
              <svg viewBox="0 0 270 58">
                <defs>
                  <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c8970" stopOpacity=".28" />
                    <stop offset="100%" stopColor="#6c8970" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 43L15 40L30 42L45 30L60 33L75 25L90 29L105 20L120 22L135 14L150 20L165 15L180 17L195 9L210 12L225 6L240 10L255 4L270 6V58H0Z"
                  fill="url(#chart-fill)"
                />
                <path
                  d="M0 43L15 40L30 42L45 30L60 33L75 25L90 29L105 20L120 22L135 14L150 20L165 15L180 17L195 9L210 12L225 6L240 10L255 4L270 6"
                  fill="none"
                  stroke="#527159"
                  strokeWidth="2"
                />
              </svg>
              <div className="health-footer">
                <span>Monitor</span>
                <span>Investigate</span>
                <span>Resolve</span>
              </div>
            </div>
          </div>
          <span className="visual-corner">02 — STABILITY</span>
        </>
      )}
      {id === "research" && (
        <>
          <span className="visual-caption">A SIGNAL FOR SOMETHING BETTER</span>
          <div className="research-orbit" />
          <div className="heart-icon">
            <Heart size={28} strokeWidth={1.5} />
          </div>
          <svg className="waveform" viewBox="0 0 400 90">
            <path
              d="M0 45H35L40 39L45 50L50 31L55 57L60 43H83L90 35L96 54L103 20L110 70L117 5L124 85L131 31L138 54L145 43H166L173 37L180 57L187 23L194 64L201 41H235L242 30L249 57L256 15L263 77L270 6L277 85L284 28L291 54L298 42H322L329 35L336 53L343 31L350 50L357 44H400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            />
          </svg>
          <span className="research-badge">SIGNAL → INSIGHT → IMPACT</span>
          <span className="visual-corner">03 — RESEARCH</span>
        </>
      )}
    </div>
  );
}

function Customize({ profile, onChange, onClose, notify }) {
  const [tab, setTab] = useState("Profile");
  const [resetConfirm, setResetConfirm] = useState(false);
  const fileInput = useRef(null);
  const update = (key, value) => onChange({ ...profile, [key]: value });
  const field = (label, key, multiline = false, hint = "") => (
    <label className="field" key={key}>
      <span>{label}</span>
      {multiline ? (
        <textarea
          value={profile[key]}
          onChange={(e) => update(key, e.target.value)}
          rows={key === "about" ? 5 : 3}
          maxLength={key === "about" ? 6000 : 1000}
        />
      ) : (
        <input
          value={profile[key]}
          onChange={(e) => update(key, e.target.value)}
          type={key === "email" ? "email" : key === "linkedin" ? "url" : "text"}
          maxLength={key === "email" ? 254 : 1000}
        />
      )}
      {hint && <small>{hint}</small>}
    </label>
  );
  async function importProfile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      if (file.size > 100000)
        throw new Error(
          "File is too large. Choose a portfolio JSON under 100 KB.",
        );
      const data = JSON.parse(await file.text());
      if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data) ||
        typeof data.name !== "string"
      )
        throw new Error("Choose a valid exported portfolio JSON file.");
      onChange(normalizeProfile(data));
      notify("Your portfolio settings have been imported.");
    } catch (error) {
      notify(
        error instanceof SyntaxError
          ? "That file is not valid JSON. Please use an exported portfolio."
          : error.message,
      );
    }
    event.target.value = "";
  }
  return (
    <Modal
      title="Customize your portfolio"
      onClose={onClose}
      className="customize-modal"
    >
      <div className="drawer-heading">
        <span className="eyebrow">MAKE IT YOURS</span>
        <h2>
          Your portfolio.
          <br />
          Your personality.
        </h2>
        <p>Changes appear instantly and stay in this browser.</p>
      </div>
      <div
        className="drawer-tabs"
        role="tablist"
        aria-label="Customization sections"
      >
        {["Profile", "Appearance", "Content"].map((t) => (
          <button
            role="tab"
            aria-selected={tab === t}
            aria-controls="customize-panel"
            key={t}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <div
        className="drawer-content"
        id="customize-panel"
        role="tabpanel"
        aria-label={tab}
      >
        {tab === "Profile" && (
          <>
            {field("Full name", "name")}
            {field("Professional title", "role")}
            {field("Location", "location")}
            {field(
              "Hero headline",
              "headline",
              true,
              "Use a new line to shape your headline.",
            )}
            {field("Introduction", "bio", true)}
            {field("Availability message", "status")}
            {field(
              "Contact email",
              "email",
              false,
              "Optional. Adds a direct email option for recruiters.",
            )}
            {profile.email && !isValidEmail(profile.email) && (
              <p className="field-error">
                Enter a valid email to enable the email button.
              </p>
            )}
            {field(
              "LinkedIn profile",
              "linkedin",
              false,
              "Use a full https://www.linkedin.com/in/… URL.",
            )}
          </>
        )}
        {tab === "Appearance" && (
          <>
            <h3>A different point of view.</h3>
            <p className="muted">
              Choose a complete layout, not just a palette.
            </p>
            <div
              className="layout-options"
              role="group"
              aria-label="Portfolio layout"
            >
              {[
                ["editorial", "Editorial", "Split hero · three-column stories"],
                ["studio", "Studio", "Centered hero · featured work"],
              ].map(([value, label, description]) => (
                <button
                  key={value}
                  className={profile.layout === value ? "active" : ""}
                  aria-pressed={profile.layout === value}
                  onClick={() => update("layout", value)}
                >
                  <span
                    className={`layout-thumbnail thumbnail-${value}`}
                    aria-hidden="true"
                  >
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="layout-option-title">
                    {label}
                    {profile.layout === value && <Check size={14} />}
                  </span>
                  <small>{description}</small>
                </button>
              ))}
            </div>
            <h3>A little color, a lot of character.</h3>
            <p className="muted">Choose an accent that feels like you.</p>
            <div className="color-options">
              {Object.entries(accents).map(([key, value]) => (
                <button
                  key={key}
                  className={profile.accent === key ? "active" : ""}
                  onClick={() => update("accent", key)}
                  aria-pressed={profile.accent === key}
                >
                  <span style={{ background: value.color }}>
                    {profile.accent === key && <Check size={18} />}
                  </span>
                  {value.label}
                </button>
              ))}
            </div>
            <h3>Set the atmosphere.</h3>
            <div className="theme-options">
              {["light", "dark"].map((theme) => (
                <button
                  key={theme}
                  className={profile.theme === theme ? "active" : ""}
                  onClick={() => update("theme", theme)}
                  aria-pressed={profile.theme === theme}
                >
                  {theme === "light" ? <Sun /> : <Moon />}
                  <span>
                    {theme === "light" ? "Warm & light" : "After hours"}
                  </span>
                  {profile.theme === theme && <Check size={16} />}
                </button>
              ))}
            </div>
            <h3 className="motion-heading">Just enough movement.</h3>
            <div
              className="motion-options"
              role="group"
              aria-label="Animation preference"
            >
              {[
                ["subtle", "Subtle motion"],
                ["off", "Still & quiet"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  aria-pressed={profile.motion === value}
                  onClick={() => update("motion", value)}
                >
                  {label}
                  {profile.motion === value && <Check size={14} />}
                </button>
              ))}
            </div>
            <div className="custom-note">
              <Sparkles size={19} />
              <p>
                Gentle entrances and intentional hover details. Your visitor’s
                reduced-motion setting always takes priority.
              </p>
            </div>
          </>
        )}
        {tab === "Content" && (
          <>
            {field("About you", "about", true)}
            <h3>Selected work</h3>
            {profile.projects.map((project, i) => (
              <details className="content-editor" key={project.id}>
                <summary>
                  {project.title}
                  <ChevronRight size={16} />
                </summary>
                {["title", "description", "detail", "note"].map((key) => (
                  <label className="field" key={key}>
                    <span>
                      {key === "note"
                        ? "Attribution"
                        : key === "detail"
                          ? "Full story"
                          : key}
                    </span>
                    <textarea
                      value={project[key]}
                      rows={key === "detail" ? 6 : 2}
                      maxLength={3000}
                      onChange={(e) =>
                        update(
                          "projects",
                          profile.projects.map((p, j) =>
                            i === j ? { ...p, [key]: e.target.value } : p,
                          ),
                        )
                      }
                    />
                  </label>
                ))}
              </details>
            ))}
            <h3>Experience</h3>
            {profile.experience.map((experience, i) => (
              <details className="content-editor" key={i}>
                <summary>
                  {experience.company}
                  <ChevronRight size={16} />
                </summary>
                {["company", "role", "dates", "description"].map((key) => (
                  <label className="field" key={key}>
                    <span>{key}</span>
                    <textarea
                      value={experience[key]}
                      rows={key === "description" ? 4 : 2}
                      maxLength={3000}
                      onChange={(e) =>
                        update(
                          "experience",
                          profile.experience.map((p, j) =>
                            i === j ? { ...p, [key]: e.target.value } : p,
                          ),
                        )
                      }
                    />
                  </label>
                ))}
              </details>
            ))}
          </>
        )}
      </div>
      <div className="drawer-footer">
        <div className="save-status">
          <Check size={14} /> Applied to this browser
        </div>
        <div className="settings-actions">
          <button
            onClick={() =>
              download(
                JSON.stringify(profile, null, 2),
                "published-profile.json",
                "application/json",
              )
            }
          >
            <Download size={15} /> Export
          </button>
          <button onClick={() => fileInput.current.click()}>
            <Upload size={15} /> Import
          </button>
          <button onClick={() => setResetConfirm(true)}>
            <RotateCcw size={15} /> Reset
          </button>
        </div>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          onChange={importProfile}
          hidden
        />
        {resetConfirm && (
          <div className="reset-confirm">
            <p>Restore the published profile and appearance?</p>
            <button
              onClick={() => {
                onChange(normalizeProfile(publishedProfile));
                setResetConfirm(false);
                notify("Published portfolio restored.");
              }}
            >
              Yes, reset
            </button>
            <button onClick={() => setResetConfirm(false)}>
              Keep my changes
            </button>
          </div>
        )}
        <p className="local-notice">
          Export, replace src/published-profile.json in GitHub, and commit to
          main to publish. Only repository collaborators can change the live
          site.
        </p>
      </div>
    </Modal>
  );
}

function App() {
  const [profile, setProfile] = useState(() => {
    if (!editorMode) return publishedProfile;
    try {
      return readProfile(window.localStorage);
    } catch {
      return publishedProfile;
    }
  });
  const [modal, setModal] = useState(null);
  const [filter, setFilter] = useState("All work");
  const [activeSection, setActiveSection] = useState("home");
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [copied, setCopied] = useState(false);
  const toastTimer = useRef(null);
  const copyTimer = useRef(null);
  const accent = accents[profile.accent];
  useMotion(profile.motion, profile.layout);
  function notify(message) {
    setToast(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 5000);
  }
  function updateProfile(value) {
    if (!editorMode) return;
    setProfile(value);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      notify(
        "Browser storage is unavailable. Export your settings to save your changes.",
      );
    }
  }
  useEffect(() => {
    document.documentElement.dataset.theme = profile.theme;
    document.documentElement.dataset.layout = profile.layout;
    document.documentElement.dataset.motion = profile.motion;
    document.documentElement.style.setProperty("--accent", accent.color);
    document.documentElement.style.setProperty("--accent-soft", accent.soft);
    document.title = `${profile.name} — ${profile.role}`;
  }, [
    profile.theme,
    profile.layout,
    profile.motion,
    profile.name,
    profile.role,
    accent,
  ]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      clearTimeout(toastTimer.current);
      clearTimeout(copyTimer.current);
    };
  }, []);
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(normalizeProfile(profile).linkedin);
      setCopied(true);
      copyTimer.current = setTimeout(() => setCopied(false), 2500);
    } catch {
      notify(
        "Clipboard access is unavailable. You can open LinkedIn and copy the address.",
      );
    }
  }
  const linkedin = normalizeProfile(profile).linkedin;
  const selectedProject = profile.projects.find((p) => modal === p.id);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#home"
            className="brand"
            aria-label={`${profile.name}, home`}
          >
            <span className="monogram">
              f<span>.</span>
            </span>
            <span className="brand-name">
              {profile.name}
              <small>{profile.role}</small>
            </span>
          </a>
          <nav
            className={menu ? "main-nav is-open" : "main-nav"}
            aria-label="Main navigation"
          >
            {[
              ["work", "Selected work"],
              ["experience", "Experience"],
              ["about", "About"],
            ].map(([id, label]) => (
              <a
                className={activeSection === id ? "active" : ""}
                href={`#${id}`}
                key={id}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            {editorMode && (
              <button
                className="customize-button"
                aria-label="Customize portfolio"
                onClick={() => setModal("customize")}
              >
                <SlidersHorizontal size={14} />
                <span>Customize</span>
              </button>
            )}
            <button
              className="header-contact"
              onClick={() => setModal("contact")}
            >
              Let’s talk <ArrowUpRight size={16} />
            </button>
            <button
              className="mobile-menu icon-button"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {editorMode && (
        <aside className="editor-banner" aria-label="Development editor mode">
          <span>
            <SlidersHorizontal size={14} />
            <strong>Editor preview</strong>
            <span>Your draft stays in this browser.</span>
          </span>
          <div>
            <button onClick={() => setModal("customize")}>
              Edit design <ArrowUpRight size={13} />
            </button>
            <a href={window.location.pathname}>
              View published version <ArrowUpRight size={13} />
            </a>
          </div>
        </aside>
      )}

      <main id="main-content" tabIndex={-1}>
        <section className="hero section-container" id="home">
          <div className="hero-main">
            <div className="hero-copy">
              <div className="availability">
                <span />
                {profile.status}
              </div>
              <h1>
                {profile.headline.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    <span className={i > 0 ? "accent-text" : ""}>{line}</span>
                    {i < profile.headline.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              <p className="hero-description">{profile.bio}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  Explore my work <ArrowUpRight size={17} />
                </a>
                <button
                  className="button button-outline"
                  onClick={() => setModal("resume")}
                >
                  <FileText size={16} /> View résumé
                </button>
              </div>
              <div className="hero-location">
                <MapPin size={14} />
                <span>{profile.location}</span>
                <i />
                <span>
                  Building beyond borders <Globe2 size={13} />
                </span>
              </div>
            </div>
            <HeroArt />
          </div>
          <div className="hero-bottom">
            <span>A LITTLE ABOUT HOW I BUILD</span>
            <div>
              <span>
                <Code2 size={17} /> Full-stack perspective
              </span>
              <span>
                <Layers3 size={17} /> Enterprise experience
              </span>
              <span>
                <Heart size={16} /> Human-centered thinking
              </span>
            </div>
            <a href="#work" aria-label="Scroll to selected work">
              <ArrowDown size={18} />
            </a>
          </div>
        </section>

        <section className="work-section section-container" id="work">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span>01</span> SELECTED WORK
              </div>
              <h2>
                Good work. Real impact<span className="accent-text">.</span>
              </h2>
              <p>
                A few ways I turn curiosity and code into something that
                matters.
              </p>
            </div>
            <div
              className="filter-tabs"
              role="group"
              aria-label="Filter selected work"
            >
              {["All work", "Engineering", "Research"].map((item) => (
                <button
                  key={item}
                  aria-pressed={filter === item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  {item === "All work" && <span>03</span>}
                </button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {profile.projects
              .filter((p) => filter === "All work" || p.category === filter)
              .map((project) => (
                <button
                  className="project-card"
                  key={project.id}
                  onClick={() => setModal(project.id)}
                  aria-label={`Read about ${project.title}`}
                >
                  <ProjectArt id={project.id} />
                  <div className="project-info">
                    <span className="project-label">{project.label}</span>
                    <div className="project-title">
                      <h3>{project.title}</h3>
                      <span className="project-arrow">
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                    <p>{project.description}</p>
                    <div className="tag-list">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </button>
              ))}
          </div>
          <div className="work-footnote">
            <span>
              <CircleDot size={12} /> A selection of professional contributions
              & published research.
            </span>
            <a href={linkedin} target="_blank" rel="noreferrer">
              The full picture on LinkedIn <ArrowUpRight size={14} />
            </a>
          </div>
        </section>

        <section
          className="experience-section section-container"
          id="experience"
        >
          <div className="experience-intro">
            <div className="eyebrow">
              <span>02</span> THE JOURNEY
            </div>
            <h2>
              Experience that
              <br />
              adds perspective<span className="accent-text">.</span>
            </h2>
            <p>From solving the unexpected to building for what’s next.</p>
            <button className="text-link" onClick={() => setModal("resume")}>
              Take a closer look at my résumé <ArrowUpRight size={15} />
            </button>
            <div className="journey-decoration" aria-hidden="true">
              <span />
              <span />
              <span />
              <ArrowUpRight size={42} />
            </div>
          </div>
          <div className="timeline">
            {profile.experience.map((job, i) => (
              <article className="timeline-item" key={i}>
                <div
                  className={`timeline-dot ${job.current ? "current" : ""}`}
                />
                <div className="job-meta">
                  <span>{job.dates}</span>
                  {job.current && (
                    <span className="current-badge">Current chapter</span>
                  )}
                </div>
                <h3>{job.role}</h3>
                <div className="job-company">
                  {job.company}
                  <ArrowUpRight size={13} />
                </div>
                <p>{job.description}</p>
                <div className="tag-list">
                  {job.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section section-container" id="about">
          <div className="about-card">
            <div className="about-visual">
              <span className="eyebrow">MORE THAN A JOB TITLE</span>
              <div className="about-initials">
                mf<span>✳</span>
              </div>
              <div className="about-visual-footer">
                <span>
                  Curious mind.
                  <br />
                  Builder at heart.
                </span>
                <ArrowUpRight size={32} strokeWidth={1} />
              </div>
            </div>
            <div className="about-copy">
              <div className="eyebrow">
                <span>03</span> THE PERSON BEHIND THE CODE
              </div>
              <h2>
                A little curiosity.
                <br />A lot of possibility<span className="accent-text">.</span>
              </h2>
              {profile.about.split("\n\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="about-values">
                <span>
                  <Globe2 size={15} /> Global collaboration
                </span>
                <span>
                  <Sparkles size={15} /> Always learning
                </span>
              </div>
            </div>
          </div>
          <div className="toolbox">
            <span className="eyebrow">MY EVERYDAY TOOLKIT</span>
            <div>
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="contact-section section-container" id="contact">
          <div className="contact-card">
            <div>
              <span className="eyebrow">
                THE NEXT CHAPTER STARTS WITH A HELLO
              </span>
              <h2>
                Something great
                <br />
                starts with a conversation<span>.</span>
              </h2>
              <p>
                Have a role, an idea, or a challenge in mind? Let’s connect.
              </p>
            </div>
            <button
              className="contact-round"
              onClick={() => setModal("contact")}
              aria-label="Start a conversation"
            >
              <ArrowUpRight size={39} strokeWidth={1.5} />
              <span>Let’s talk</span>
            </button>
            <span className="contact-orbit" aria-hidden="true" />
          </div>
        </section>
      </main>

      <footer className="site-footer section-container">
        <a href="#home" className="footer-brand">
          <span className="monogram">
            f<span>.</span>
          </span>
          <span>Thoughtfully built. Always evolving.</span>
        </a>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <div>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit LinkedIn"
          >
            <Linkedin size={17} />
          </a>
          <a href="#home" aria-label="Back to top">
            <ArrowUpRight size={19} />
          </a>
        </div>
      </footer>

      {editorMode && modal === "customize" && (
        <Customize
          profile={profile}
          onChange={updateProfile}
          onClose={() => setModal(null)}
          notify={notify}
        />
      )}
      {selectedProject && (
        <Modal
          title={selectedProject.title}
          onClose={() => setModal(null)}
          className="project-modal"
        >
          <ProjectArt id={selectedProject.id} large />
          <div className="project-modal-copy">
            <span className="eyebrow">{selectedProject.label}</span>
            <h2>{selectedProject.title}</h2>
            <p className="project-attribution">{selectedProject.note}</p>
            {selectedProject.detail.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <div className="tag-list">
              {selectedProject.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <p className="illustration-note">
              Conceptual illustration. No internal systems or client data are
              shown.
            </p>
            <a
              className="button button-primary"
              href={linkedin}
              target="_blank"
              rel="noreferrer"
            >
              More on LinkedIn <ArrowUpRight size={16} />
            </a>
          </div>
        </Modal>
      )}
      {modal === "contact" && (
        <Modal
          title="Let’s start a conversation"
          onClose={() => setModal(null)}
          className="contact-modal"
        >
          <span className="contact-modal-icon">
            <ArrowUpRight size={30} />
          </span>
          <span className="eyebrow">GOOD THINGS START HERE</span>
          <h2>
            Let’s make
            <br />
            something meaningful.
          </h2>
          <p>
            Whether you’re building a team or exploring an idea, I’d love to
            hear about it.
          </p>
          <a
            className="button button-primary"
            href={linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={18} /> Connect on LinkedIn{" "}
            <ArrowUpRight size={17} />
          </a>
          {isValidEmail(profile.email) && (
            <a
              className="button button-outline"
              href={`mailto:${profile.email}`}
            >
              <Mail size={17} /> {profile.email}
            </a>
          )}
          <button className="button button-outline" onClick={copyLink}>
            {copied ? <Check size={17} /> : <Copy size={17} />}
            {copied ? "Profile link copied" : "Copy LinkedIn profile link"}
          </button>
          <div className="contact-location">
            <MapPin size={14} />
            {profile.location}
          </div>
        </Modal>
      )}
      {modal === "resume" && (
        <Modal
          title={`${profile.name} résumé`}
          onClose={() => setModal(null)}
          className="resume-modal"
        >
          <div className="resume-toolbar">
            <span className="eyebrow">THE RECRUITER EDITION</span>
            <div>
              <button
                className="button button-outline"
                onClick={() =>
                  download(
                    resumeText(profile),
                    `${profile.name.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-resume.txt`,
                    "text/plain",
                  )
                }
              >
                <Download size={15} /> Download .txt
              </button>
              <button
                className="button button-primary"
                onClick={() => window.print()}
              >
                <Printer size={15} /> Print / PDF
              </button>
            </div>
          </div>
          <div className="resume-document">
            <h2>{profile.name}</h2>
            <p className="resume-role">{profile.role}</p>
            <p className="resume-contact">
              {profile.location}
              {isValidEmail(profile.email) && <> · {profile.email}</>}
              <br />
              <a href={linkedin}>{linkedin}</a>
            </p>
            <h3>Profile</h3>
            <p>{profile.bio}</p>
            <h3>Experience</h3>
            {profile.experience.map((job, i) => (
              <div className="resume-job" key={i}>
                <h4>
                  {job.role} · {job.company}
                </h4>
                <span>{job.dates}</span>
                <p>{job.description}</p>
              </div>
            ))}
            <h3>Selected work & research</h3>
            {profile.projects.map((project) => (
              <div className="resume-job" key={project.id}>
                <h4>{project.title}</h4>
                <span>{project.note}</span>
                <p>{project.description}</p>
              </div>
            ))}
            <h3>Technical toolkit</h3>
            <p>{skills.join(" · ")}</p>
          </div>
        </Modal>
      )}
      <div className={`toast ${toast ? "visible" : ""}`} role="status">
        {toast && (
          <>
            <CircleDot size={17} />
            <span>{toast}</span>
            <button
              aria-label="Dismiss notification"
              onClick={() => setToast("")}
            >
              <X size={16} />
            </button>
          </>
        )}
      </div>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
