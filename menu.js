// menu.js
// Единая, стабильная инициализация меню для всех страниц
// STEP 1 — логика и клики, без эффектов

(function () {
  let isMenuOpen = false;
  let isInitialized = false;

  function initMenu() {
    if (isInitialized) return;
    isInitialized = true;

    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    if (!menuBtn || !sideMenu || !menuOverlay) return;

    const menuLinks = sideMenu.querySelectorAll("a");

    function openMenu() {
      if (isMenuOpen) return;

      isMenuOpen = true;
      menuBtn.classList.add("active");
      sideMenu.classList.add("active");
      menuOverlay.classList.add("active");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      if (!isMenuOpen) return;

      isMenuOpen = false;
      menuBtn.classList.remove("active");
      sideMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }

    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isMenuOpen ? closeMenu() : openMenu();
    });

    menuOverlay.addEventListener("click", (e) => {
      e.stopPropagation();
      closeMenu();
    });

    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });
  }

  function loadMenu() {
    const container = document.getElementById("menu-container");
    if (!container) return;

    fetch("/menu.html")
      .then(r => r.text())
      .then(html => {
        container.innerHTML = html;
        initMenu();
      })
      .catch(() => {
        // намеренно без логов — тишина важнее шума
      });
  }

  document.addEventListener("DOMContentLoaded", loadMenu);
})();
