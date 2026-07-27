const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const progress = document.querySelector(".scroll-progress");
const cursorLight = document.querySelector(".cursor-light");
const heroVisual = document.querySelector(".hero-visual");
const heroObject = document.querySelector(".parallax-object");
const themeSwitch = document.querySelector(".theme-switch");
const themeLabel = document.querySelector(".switch-label");

const syncThemeControl = () => {
  const isDark = document.documentElement.dataset.theme === "dark";
  themeSwitch?.setAttribute("aria-pressed", String(isDark));
  themeSwitch?.setAttribute("aria-label", isDark ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren");
  if (themeLabel) themeLabel.textContent = isDark ? "DARK" : "LIGHT";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#10100f" : "#f2f2ef");
};

themeSwitch?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = nextTheme;
  try {
    localStorage.setItem("js-portfolio-theme", nextTheme);
  } catch {
    // The visual switch still works when storage is unavailable.
  }
  syncThemeControl();
});

syncThemeControl();

const updateScroll = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.transform = `scaleX(${ratio})`;
};

window.addEventListener("scroll", updateScroll, { passive: true });
window.addEventListener("resize", updateScroll);
updateScroll();

document.querySelectorAll(".reveal").forEach((element) => {
  element.style.setProperty("--delay", `${element.dataset.delay || 0}ms`);
});

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

if (canHover && !prefersReducedMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      cursorLight.style.opacity = "1";
      cursorLight.style.transform = `translate(${event.clientX - 210}px, ${event.clientY - 210}px)`;
    },
    { passive: true },
  );

  document.documentElement.addEventListener("mouseleave", () => {
    cursorLight.style.opacity = "0";
  });

  heroVisual?.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroObject.style.setProperty("--px", `${x * 20}px`);
    heroObject.style.setProperty("--py", `${y * 14}px`);
  });

  heroVisual?.addEventListener("pointerleave", () => {
    heroObject.style.setProperty("--px", "0px");
    heroObject.style.setProperty("--py", "0px");
  });

  document.querySelectorAll(".interactive-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  });

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1100px) rotateX(${-y * 2.5}deg) rotateY(${x * 3.5}deg)`;
      const image = card.querySelector("img");
      image.style.transform = `translateZ(52px) translate(${x * 10}px, ${y * 8}px) rotate(${card.closest(".project-vtol") ? 3 : -3}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.querySelector("img").style.transform = "";
    });
  });

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
    });

    element.addEventListener("pointerleave", () => {
      element.style.transform = "";
    });
  });
}

document.querySelectorAll(".project-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    const details = document.getElementById(button.getAttribute("aria-controls"));
    button.setAttribute("aria-expanded", String(!isOpen));
    details.classList.toggle("open", !isOpen);
  });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
});

document.getElementById("year").textContent = new Date().getFullYear();
