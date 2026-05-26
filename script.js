const slides = [
  "page_01.jpg",
  "page_03.jpg",
  "page_04.jpg",
  "page_05.jpg",
  "page_06.jpg",
  "page_07.jpg",
  "page_08.jpg",
  "page_09.jpg",
  "page_10.jpg",
  "page_11.jpg",
  "page_12.jpg",
  "page_13.jpg",
  "page_14.jpg",
  "page_15.jpg",
  "page_16.jpg",
  "page_17.jpg",
  "page_18.jpg",
  "page_19.jpg",
  "page_20.jpg",
  "page_21.jpg",
  "page_22.jpg",
  "page_23.jpg",
  "page_24.jpg",
];

const body = document.body;
const introButton = document.querySelector(".intro-button");
const viewer = document.querySelector("#viewer");
const slideImage = document.querySelector("#slideImage");
const pageSheet = document.querySelector(".page-sheet");
const currentPage = document.querySelector("#currentPage");
const totalPages = document.querySelector("#totalPages");
const progressBar = document.querySelector("#progressBar");
const prevButtons = document.querySelectorAll(".prev, #prevButton");
const nextButtons = document.querySelectorAll(".next, #nextButton");

let index = 0;
let opened = false;

totalPages.textContent = String(slides.length);

function openViewer() {
  if (opened) return;
  opened = true;
  body.classList.add("intro-leaving");

  window.setTimeout(() => {
    body.classList.add("viewer-open");
    viewer.scrollIntoView({ block: "start" });
  }, 520);
}

function updateSlide(direction = "next") {
  slideImage.src = `./assets/slides/${slides[index]}`;
  slideImage.alt = `프롬뱅크 PDF ${index + 1}페이지`;
  currentPage.textContent = String(index + 1);
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;

  prevButtons.forEach((button) => {
    button.disabled = index === 0;
  });
  nextButtons.forEach((button) => {
    button.disabled = index === slides.length - 1;
  });

  pageSheet.classList.remove("turn-next", "turn-prev");
  void pageSheet.offsetWidth;
  pageSheet.classList.add(direction === "prev" ? "turn-prev" : "turn-next");
}

function moveSlide(direction) {
  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= slides.length) return;
  index = nextIndex;
  updateSlide(direction < 0 ? "prev" : "next");
}

introButton.addEventListener("click", openViewer);

window.addEventListener(
  "wheel",
  (event) => {
    if (!opened && event.deltaY > 8) openViewer();
  },
  { passive: true }
);

window.addEventListener("touchmove", openViewer, { passive: true, once: true });

prevButtons.forEach((button) => button.addEventListener("click", () => moveSlide(-1)));
nextButtons.forEach((button) => button.addEventListener("click", () => moveSlide(1)));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    openViewer();
    moveSlide(1);
  }
  if (event.key === "ArrowLeft") {
    moveSlide(-1);
  }
});

updateSlide();
