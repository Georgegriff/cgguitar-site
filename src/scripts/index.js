import "./shared.js";

document.querySelector('#controls').addEventListener('click', (event) => {
    const $slide = document.querySelector(event.target.getAttribute('href'));
    if (!$slide) return;
    
    if ($slide.scrollIntoViewIfNeeded) {
      event.preventDefault();
      $slide.scrollIntoViewIfNeeded();
    } else if ($slide.scrollIntoView) {
      event.preventDefault();
      $slide.scrollIntoView();
    }
  });