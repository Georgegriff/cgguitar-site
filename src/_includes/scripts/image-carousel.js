const goToSlideByLink = (link) => {
  const slide = document.querySelector(link.getAttribute("href"));
  if (!slide) return;
  const current = document.querySelector('.controls__dot[aria-current="true"]');
  if (current) {
    current.removeAttribute("aria-current");
  }
  link.setAttribute("aria-current", true);
  if (slide.scrollIntoViewIfNeeded) {
    slide.scrollIntoViewIfNeeded();
    return true;
  } else if (slide.scrollIntoView) {
    slide.scrollIntoView();
    return true;
  }
  return false;
};
window.imageCarousel = {
  init: () => {
    const carousel = document.querySelector(".image-carousel");

    // intersection observer to load images when carousel is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          carousel.querySelectorAll("img").forEach((img) => {
            img.loading = "eager";
          });
        }
      });
    });

    observer.observe(carousel);
  },
  onControls: (e) => {
    if (goToSlideByLink(e.target)) {
      e.preventDefault();
    }
  },
  onNext: (e) => {
    e.stopPropagation();

    const currentLink = document.querySelector(
      '.controls__dot[aria-current="true"]'
    );
    const allImageLinks = Array.from(currentLink.parentNode.children);
    const currentIndex = allImageLinks.indexOf(currentLink);
    if (currentIndex === allImageLinks.length - 1) {
      goToSlideByLink(allImageLinks[0]);
    } else {
      goToSlideByLink(allImageLinks[currentIndex + 1]);
    }
  },
  onPrevious: (e) => {
    e.stopPropagation();

    const currentLink = document.querySelector(
      '.controls__dot[aria-current="true"]'
    );
    const allImageLinks = Array.from(currentLink.parentNode.children);
    const currentIndex = allImageLinks.indexOf(currentLink);
    if (currentIndex === 0) {
      goToSlideByLink(allImageLinks[allImageLinks.length - 1]);
    } else {
      goToSlideByLink(allImageLinks[currentIndex - 1]);
    }
  },
};

window.addEventListener("DOMContentLoaded", () => window.imageCarousel.init());
