const socialToggle = document.getElementById("socialToggle");
const socialPopover = document.getElementById("socialPopover");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("header[id], section[id]");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const themeToggle = document.getElementById("themeToggle");
const revealItems = document.querySelectorAll(".section, .service-card, .project-card, .image-card, .stats");

const savedTheme = localStorage.getItem("aayushPortfolioTheme");

function updateThemeButton() {
  const isBright = document.body.classList.contains("bright-mode");
  themeToggle.textContent = isBright ? "Dark Mode" : "Bright Mode";
  themeToggle.setAttribute("aria-label", isBright ? "Switch to dark mode" : "Switch to bright mode");
}

if (savedTheme === "bright") {
  document.body.classList.add("bright-mode");
}

updateThemeButton();

socialToggle.addEventListener("click", () => {
  socialPopover.classList.toggle("open");
});

menuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("bright-mode");
  localStorage.setItem(
    "aayushPortfolioTheme",
    document.body.classList.contains("bright-mode") ? "bright" : "dark"
  );
  updateThemeButton();
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 140) {
      current = section.id;
    }
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("active", anchor.getAttribute("href") === `#${current}`);
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideBrand = event.target.closest(".brand");
  if (!clickedInsideBrand) {
    socialPopover.classList.remove("open");
  }
});

// Contact form uses a normal native submission to Formspree (no JS interception).
// This avoids CORS issues when testing locally via file:// and works identically
// once hosted online. Formspree will show its own confirmation page after sending.

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => {
  item.classList.add("scroll-reveal");
  revealObserver.observe(item);
});
