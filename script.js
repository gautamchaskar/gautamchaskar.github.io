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

      const subject = `Contact via Portfolio from ${name}`;
      const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

      const mailtoLink = `mailto:chaskargautam@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;
    });
  }
});
