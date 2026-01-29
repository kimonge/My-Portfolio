// ==================== DOM Ready ====================
document.addEventListener("DOMContentLoaded", () => {

  // -------------------- Mobile Menu --------------------
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];
  const darkModeToggle = document.getElementById("dark-mode-toggle");

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

});
