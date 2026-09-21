(() => {
  const allowedThemes = new Set(["light", "dark"]);

  try {
    const savedTheme = localStorage.getItem("js-portfolio-theme");
    const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.dataset.theme = allowedThemes.has(savedTheme) ? savedTheme : preferredTheme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
