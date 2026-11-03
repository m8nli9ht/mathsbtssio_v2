const themeButton = document.querySelector("[data-theme-toggle]");
const savedTheme = localStorage.getItem("theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "sombre" : "clair";
document.documentElement.dataset.theme = savedTheme || preferredTheme;

themeButton?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "sombre" ? "clair" : "sombre";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  themeButton.setAttribute("aria-pressed", String(nextTheme === "sombre"));
});

const sections = [...document.querySelectorAll("main h2[id], main h3[id]")];
const links = [...document.querySelectorAll(".sommaire a[href^='#']")];
if (sections.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of links) {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle("actif", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      }
    }
  }, { rootMargin: "-15% 0px -70% 0px" });
  sections.forEach((section) => observer.observe(section));
}
