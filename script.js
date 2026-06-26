document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Logic ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const closeMenuBtn = document.getElementById("close-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  function toggleMenu() {
    const isHidden = mobileMenu.classList.contains("translate-x-full");
    if (isHidden) {
      mobileMenu.classList.remove("translate-x-full");
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      mobileMenu.classList.add("translate-x-full");
      document.body.style.overflow = "";
    }
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", toggleMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener("click", toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target); // Only animate once
        }
      });
    },
    {
      root: null,
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -50px 0px",
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-gray-900/95", "backdrop-blur-md", "shadow-lg");
      navbar.classList.remove("py-4");
      navbar.classList.add("py-2");
    } else {
      navbar.classList.remove(
        "bg-gray-900/95",
        "backdrop-blur-md",
        "shadow-lg"
      );
      navbar.classList.remove("py-2");
      navbar.classList.add("py-4");
    }
  });

  // --- Contact Form Handling ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const message = document.getElementById("contact-message").value;

      const text = `*New Inquiry from Portfolio*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;

      const whatsappUrl = `https://wa.me/+917709171839?text=${encodeURIComponent(
        text
      )}`;

      window.open(whatsappUrl, "_blank");
    });
  }

  // --- Dynamic Experience Duration ---
  const durationElements = document.querySelectorAll(".job-duration");
  durationElements.forEach((el) => {
    const startStr = el.getAttribute("data-start");
    const endStr = el.getAttribute("data-end");
    if (!startStr) return;

    const [startYear, startMonth] = startStr.split("-").map(Number);
    let endYear, endMonth;

    if (endStr === "present") {
      const today = new Date();
      endYear = today.getFullYear();
      endMonth = today.getMonth() + 1; // 1-indexed (Jan = 1, Dec = 12)
    } else {
      [endYear, endMonth] = endStr.split("-").map(Number);
    }

    // Calculate total months inclusive
    const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
    
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    let durationStr = "";
    if (years > 0) {
      durationStr += `${years} yr${years > 1 ? "s" : ""}`;
    }
    if (months > 0) {
      if (durationStr) durationStr += " ";
      durationStr += `${months} mo${months > 1 ? "s" : ""}`;
    }

    if (durationStr) {
      const originalText = el.textContent.split(" · ")[0];
      el.textContent = `${originalText} · ${durationStr}`;
    }
  });
});
