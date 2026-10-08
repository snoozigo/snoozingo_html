const header = document.querySelector(".header");
const toggle = document.querySelector(".header__toggle");
const nav = document.querySelector("#site-nav");
const menuLabel = toggle.querySelector(".sr-only");

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  nav.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  menuLabel.textContent = open ? "Close menu" : "Open menu";
  updateHeader();
}

function updateHeader() {
  const open = toggle.getAttribute("aria-expanded") === "true";
  header.classList.toggle("is-solid", open || window.scrollY > 40);
}

toggle.addEventListener("click", () => {
  setMenu(toggle.getAttribute("aria-expanded") !== "true");
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setMenu(false);
});
updateHeader();

document.querySelectorAll(".carousel").forEach((carousel) => {
  const images = [...carousel.querySelectorAll("img")];
  const dots = [...carousel.querySelectorAll(".carousel__dots button")];
  let index = 0;
  let startX = null;

  function show(next) {
    const count = images.length;
    index = ((next % count) + count) % count;
    images.forEach((image, imageIndex) => {
      const active = imageIndex === index;
      image.classList.toggle("is-active", active);
      if (active) image.removeAttribute("aria-hidden");
      else image.setAttribute("aria-hidden", "true");
    });
    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-selected", String(dotIndex === index));
    });
  }

  carousel.addEventListener("pointerdown", (event) => {
    if (event.target.closest("button")) return;
    startX = event.clientX;
  });

  carousel.addEventListener("pointerup", (event) => {
    if (startX == null) return;
    const delta = event.clientX - startX;
    if (delta > 48) show(index - 1);
    if (delta < -48) show(index + 1);
    startX = null;
  });

  carousel.addEventListener("pointercancel", () => {
    startX = null;
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => show(dotIndex));
  });
});

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
