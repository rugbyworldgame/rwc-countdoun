// menu.js
// Единая инициализация меню для всех страниц

(function () {
  function initMenu() {
    const menuBtn = document.getElementById("menuBtn");
    const sideMenu = document.getElementById("sideMenu");
    const menuOverlay = document.getElementById("menuOverlay");

    if (!menuBtn || !sideMenu || !menuOverlay) return;

    const menuLinks = sideMenu.querySelectorAll("a");

    function openMenu() {
      menuBtn.classList.add("active");
      sideMenu.classList.add("active");
      menuOverlay.classList.add("active");
      document.body.classList.add("menu-open");
    }

    function closeMenu() {
      menuBtn.classList.remove("active");
      sideMenu.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }

    menuBtn.addEventListener("click", () => {
      menuBtn.classList.contains("active") ? closeMenu() : openMenu();
    });

    menuOverlay.addEventListener("click", closeMenu);
    menuLinks.forEach(link => link.addEventListener("click", closeMenu));
  }

  function loadMenu() {
    fetch("/menu.html")
      .then(r => r.text())
      .then(html => {
        const container = document.getElementById("menu-container");
        if (!container) return;
        container.innerHTML = html;
        initMenu();
      });
  }

  document.addEventListener("DOMContentLoaded", loadMenu);
})();
