import { useEffect } from "react";

export function useMotion(motion, layout) {
  useEffect(() => {
    if (motion !== "subtle" || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sections = [
      ...document.querySelectorAll("main > section:not(.hero)"),
    ];
    let observer;
    function sync() {
      observer?.disconnect();
      sections.forEach((section) => section.classList.remove("reveal-enter"));
      if (preference.matches) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("reveal-enter");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.08 },
      );
      sections.forEach((section) => observer.observe(section));
    }
    sync();
    preference.addEventListener("change", sync);
    return () => {
      observer?.disconnect();
      preference.removeEventListener("change", sync);
      sections.forEach((section) => section.classList.remove("reveal-enter"));
    };
  }, [motion, layout]);
}
