// ===== Hamburger Menu Script =====
document.addEventListener("DOMContentLoaded", function() {
  const btn = document.getElementById("hamburger-btn");
  const menu = document.getElementById("slide-menu");
  const overlay = document.getElementById("menu-overlay");

  if (!btn || !menu || !overlay) {
    console.error("Hamburger menu: missing element(s). btn:", !!btn, "menu:", !!menu, "overlay:", !!overlay);
    return;
  }

  function openMenu() {
    menu.classList.add("show");
    overlay.classList.add("show");
    btn.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    setTimeout(() => menu.querySelector("a")?.focus(), 120);
  }

  function closeMenu() {
    menu.classList.remove("show");
    overlay.classList.remove("show");
    btn.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
    btn.focus();
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains("show");
    isOpen ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && menu.classList.contains("show")) {
      closeMenu();
    }
  });

  menu.addEventListener("click", (ev) => {
    const a = ev.target.closest("a");
    if (a) closeMenu();
  });
});
