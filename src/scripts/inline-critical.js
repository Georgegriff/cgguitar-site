document.querySelector('[data-more-trigger]').style.display = 'none';
document.querySelector('burger-menu').style.display = 'block';
document.querySelectorAll('[data-desktop-hidden]').forEach((node) => {
    node.setAttribute('data-desktop-link', true)
});