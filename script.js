const body = document.body;
const introButton = document.querySelector(".intro-arrow");
const portfolio = document.querySelector("#portfolio");

function openPortfolio() {
  body.classList.add("intro-leaving");
  window.setTimeout(() => {
    body.classList.add("portfolio-open");
    portfolio.scrollIntoView({ block: "start" });
  }, 560);
}

introButton?.addEventListener("click", openPortfolio);

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
);

document.querySelectorAll("[data-animate]").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
  animationObserver.observe(element);
});
