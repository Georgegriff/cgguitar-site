const controls = document.querySelector('#controls');

const goToSlideByLink = (link) => {
    const slide = document.querySelector(link.getAttribute('href'));
    if (!slide) return;
    const current = document.querySelector('.controls__dot[aria-current="true"]');
    if(current) {
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
}

controls.addEventListener('click', (event) => {
    if(goToSlideByLink(event.target)) {
        event.preventDefault();
    }
  });

document.querySelector(".carousel__prev").addEventListener("click", (e) => {
    e.stopPropagation();

    const currentLink = document.querySelector('.controls__dot[aria-current="true"]');
    const allImageLinks = Array.from(currentLink.parentNode.children);
    const currentIndex = allImageLinks.indexOf(currentLink);
    if(currentIndex === 0) {
        goToSlideByLink(allImageLinks[allImageLinks.length - 1])
    } else {
        goToSlideByLink(allImageLinks[currentIndex - 1])
    }

});

document.querySelector(".carousel__next").addEventListener("click", (e) => {
    e.stopPropagation();

    const currentLink = document.querySelector('.controls__dot[aria-current="true"]');
    const allImageLinks = Array.from(currentLink.parentNode.children);
    const currentIndex = allImageLinks.indexOf(currentLink);
    if(currentIndex === allImageLinks.length - 1) {
        goToSlideByLink(allImageLinks[0])
    } else {
        goToSlideByLink(allImageLinks[currentIndex + 1])
    }

});
