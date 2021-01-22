document.querySelector('[data-more-trigger]').style.display = 'none';
document.querySelectorAll('[data-desktop-hidden]').forEach((node) => {
    node.setAttribute('data-desktop-link', true)
});