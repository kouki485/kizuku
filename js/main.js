document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".main-nav");
  const currentYearEl = document.querySelector("#current-year");
  const siteHeader = document.querySelector(".site-header");

  if (navToggle && navigation) {
    navToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.classList.toggle("is-active", isOpen);
    });

    navigation.addEventListener("click", (event) => {
      const target = event.target;
      if (
        target instanceof HTMLAnchorElement &&
        navigation.classList.contains("is-open")
      ) {
        navigation.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("is-active");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navigation.classList.contains("is-open")) {
        navigation.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.classList.remove("is-active");
      }
    });
  }

  if (currentYearEl) {
    currentYearEl.textContent = String(new Date().getFullYear());
  }

  if (siteHeader) {
    const handleHeaderShadow = () => {
      if (window.scrollY > 10) {
        siteHeader.classList.add("is-scrolled");
      } else {
        siteHeader.classList.remove("is-scrolled");
      }
    };

    handleHeaderShadow();
    window.addEventListener("scroll", handleHeaderShadow, { passive: true });
  }
});

