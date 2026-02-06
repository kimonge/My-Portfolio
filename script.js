// ==================== DOM Ready ====================
document.addEventListener("DOMContentLoaded", () => {

  // -------------------- Mobile Menu --------------------
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const cvModal = document.getElementById("cvModal");
  const openCvBtn = document.getElementById("openCv");
  const closeCvBtn = document.getElementById("closeCv");
  const logoModal = document.getElementById("logoModal");
  const openLogoBtn = document.getElementById("openLogo");
  const closeLogoBtn = document.getElementById("closeLogo");
  const toggleLogoSizeBtn = document.getElementById("toggleLogoSize");

  const isMobile = () => window.innerWidth <= 768;

  if (menuToggle && nav) {
    const closeNav = () => {
      nav.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.style.display = "block"; // show hamburger again
    };

    const openNav = () => {
      nav.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.style.display = "none"; // hide hamburger
    };

    // Toggle nav on hamburger click
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (nav.classList.contains("active")) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close nav when a nav link is clicked
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        if (isMobile()) closeNav();
      });
    });

    // Close nav when clicking outside
    document.addEventListener("click", (e) => {
      if (isMobile() && nav.classList.contains("active") && !nav.contains(e.target) && e.target !== menuToggle) {
        closeNav();
      }
    });

    // Close nav with ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("active")) {
        closeNav();
      }
    });
  }

  // -------------------- Dark Mode --------------------
  const setDarkModeIcon = () => {
    if (!darkModeToggle) return;
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    darkModeToggle.setAttribute(
      "aria-pressed",
      document.body.classList.contains("dark-mode") ? "true" : "false"
    );
  };

  // Load saved preference
  const savedMode = localStorage.getItem("darkMode");

  if (savedMode === "enabled") {
    document.body.classList.add("dark-mode");
  } else if (!savedMode && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode");
  }

  setDarkModeIcon();

  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      document.body.classList.toggle("dark-mode");

      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode") ? "enabled" : "disabled"
      );

      setDarkModeIcon();
    });
  }

  // -------------------- Animate Progress Bars --------------------
  const progressBars = document.querySelectorAll(".progress-bar");
  const scrollTopBtn = document.getElementById("scroll-top");

  if ("IntersectionObserver" in window && progressBars.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const target = bar.dataset.progress;

          bar.style.width = target + "%";
          bar.textContent = target + "%";
          bar.setAttribute("aria-valuenow", target);

          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
  }

  // -------------------- Scroll To Top --------------------
  if (scrollTopBtn) {
    const toggleScrollTop = () => {
      if (window.scrollY > 300) {
        scrollTopBtn.classList.add("is-visible");
      } else {
        scrollTopBtn.classList.remove("is-visible");
      }
    };

    toggleScrollTop();

    window.addEventListener("scroll", toggleScrollTop);

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // -------------------- CV Modal --------------------
  if (cvModal && openCvBtn && closeCvBtn) {
    const openModal = () => {
      cvModal.classList.add("is-open");
      cvModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      cvModal.classList.remove("is-open");
      cvModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    openCvBtn.addEventListener("click", openModal);
    closeCvBtn.addEventListener("click", closeModal);

    cvModal.addEventListener("click", (e) => {
      if (e.target === cvModal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && cvModal.classList.contains("is-open")) closeModal();
    });
  }

  // -------------------- Logo Modal --------------------
  if (logoModal && openLogoBtn && closeLogoBtn && toggleLogoSizeBtn) {
    const openModal = (e) => {
      e?.preventDefault();
      logoModal.classList.add("is-open");
      logoModal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
      logoModal.classList.remove("is-open");
      logoModal.setAttribute("aria-hidden", "true");
      logoModal.classList.remove("is-large");
      toggleLogoSizeBtn.setAttribute("aria-pressed", "false");
      toggleLogoSizeBtn.textContent = "Enlarge";
      document.body.style.overflow = "";
    };

    openLogoBtn.addEventListener("click", openModal);
    closeLogoBtn.addEventListener("click", closeModal);

    logoModal.addEventListener("click", (event) => {
      if (event.target === logoModal) closeModal();
    });

    toggleLogoSizeBtn.addEventListener("click", () => {
      const isLarge = logoModal.classList.toggle("is-large");
      toggleLogoSizeBtn.setAttribute("aria-pressed", isLarge ? "true" : "false");
      toggleLogoSizeBtn.textContent = isLarge ? "Smaller" : "Enlarge";
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && logoModal.classList.contains("is-open")) closeModal();
    });
  }

});
