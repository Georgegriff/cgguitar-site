import { css } from 'lit-element';

export const liteYtCss = css`lite-youtube {
  background-color: #000;
  position: relative;
  display: block;
  contain: content;
  background-position: center center;
  background-size: cover;
  cursor: pointer;
  max-width: 720px;
}

/* gradient */
lite-youtube::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==);
  background-position: top;
  background-repeat: repeat-x;
  height: 60px;
  padding-bottom: 50px;
  width: 100%;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
}

/* responsive iframe with a 16:9 aspect ratio
  thanks https://css-tricks.com/responsive-iframes/
*/
lite-youtube::after {
  content: "";
  display: block;
  padding-bottom: calc(100% / (16 / 9));
}
lite-youtube > iframe {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 0;
}


.lyt-visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
`
