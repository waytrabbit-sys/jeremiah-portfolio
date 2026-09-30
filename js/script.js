/* ==========================================================
   JAPZ PORTFOLIO - script.js
   1. Mobile menu   2. Image placeholders   3. Active nav link
   4. Project links (ready for future details)   5. Contact form
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* 1. Mobile menu ------------------------------------------ */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

  /* 2. Image placeholders ----------------------------------- */
  // If an image file is missing, show the neutral placeholder instead.
  document.querySelectorAll(".img-slot").forEach(slot => {
    const img = slot.querySelector("img");
    if (!img) return;
    const markMissing = () => { slot.classList.add("is-missing"); img.hidden = true; };
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  /* 3. Highlight current section in the nav ------------------ */
  const links = document.querySelectorAll(".site-nav ul a");
  const sections = [...links]
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => observer.observe(s));
  }

  /* 4. Project links ---------------------------------------- */
  // Each card has data-project="project-id". To open a details page or modal
  // later, handle the click here using that id.
  document.querySelectorAll("[data-project-link]").forEach(link => {
    link.addEventListener("click", e => {
      if (link.getAttribute("href") === "#") {
        e.preventDefault(); // placeholder link: do nothing until a real URL is added
      }
      // Future: const id = link.closest(".project-card").dataset.project;
    });
  });

  /* 5. Contact form */
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", (e) => {
    const emailInput = form.querySelector('input[type="email"]');
    
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }

    if (emailInput && !emailInput.validity.valid) {
      e.preventDefault();
      emailInput.reportValidity();
    }

    // If valid, DO NOT prevent submission.
    // Formspree will receive the form data.
  });
}

    status.className = "form-status " + (valid ? "ok" : "error");
    status.textContent = valid
      ? "Thanks! Your message is ready, but the form is not connected to an email service yet."
      : "Please fill in your name, a valid email, and a message.";
  });
});
