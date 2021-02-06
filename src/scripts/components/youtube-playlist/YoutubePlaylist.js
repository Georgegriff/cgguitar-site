/* eslint-disable lit-a11y/click-events-have-key-events */
import { html, css, LitElement } from 'lit-element';
import {render} from 'lit-html';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import 'lite-youtube-embed';
import {liteYtCss} from './liteYTCss.js';


const convertDuration = (input) => {
  const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let a11yTime = '';
  if (reptms.test(input)) {
      const matches = reptms.exec(input);
      if (matches[1]) hours = Number(matches[1]);
      if (matches[2]) minutes = Number(matches[2]);
      if (matches[3]) seconds = Number(matches[3]);
  }
  if (hours) {
      hours = hours < 10 ? `0${hours}` : hours;
      a11yTime += `${hours} hours,`;
  }
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  a11yTime += `${minutes} minutes, `;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  a11yTime += `${seconds} seconds`;
  const timeString = a11yTime.replace("hours,", ":").replace("minutes,", ":").replace("seconds", "").replace(/\s/g, "");

  return {time: timeString, str: a11yTime };
};

function shortenLargeNumber(num, digits) {
  const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  let decimal;

  // eslint-disable-next-line no-plusplus
  for(let i=units.length-1; i>=0; i--) {
      decimal = 1000 ** (i+1);

      if(num <= -decimal || num >= decimal) {
          return +(num / decimal).toFixed(digits) + units[i];
      }
  }
  return num;
}


const viewsIcon = () => html`<svg width="36" height="27" viewBox="0 0 36 27"><defs><style>.a{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;}</style></defs><g transform="translate(0 -4.5)"><path class="a" d="M1.5,18S7.5,6,18,6,34.5,18,34.5,18,28.5,30,18,30,1.5,18,1.5,18Z"/><path class="a" d="M22.5,18A4.5,4.5,0,1,1,18,13.5,4.5,4.5,0,0,1,22.5,18Z"/></g></svg>`;

const durationIcon = () => html`<svg width="27" height="27" viewBox="0 0 27 27"><defs><style>.a{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:3px;}</style></defs><g transform="translate(-1.5 -1.5)"><path class="a" d="M27,15A12,12,0,1,1,15,3,12,12,0,0,1,27,15Z" transform="translate(0 0)"/><path class="a" d="M18,9v9l6,3" transform="translate(-3.75 -2)"/></g></svg>`;

const openIcon = () => html`<svg width="27" height="27" viewBox="0 0 27 27"><path d="M28.5,28.5H7.5V7.5h9.375v-3H7.5a3.008,3.008,0,0,0-3,3v21a3.008,3.008,0,0,0,3,3h21a3.008,3.008,0,0,0,3-3V19.125h-3Zm-8.25-24v3H26.4L11.25,22.65l2.1,2.1L28.5,9.6v6.15h3V4.5Z" transform="translate(-4.5 -4.5)"/></svg>`;

const openLink = (id) => html`<a class="external-link" rel="noopener" title="Open current video on YouTube" target="_blank" href="https://youtube.com/watch?v=${id}" >${openIcon()}</a>`



const renderStats  = (stats, video, renderOpen = false) =>  html`<div class="stats">
  ${stats ? html`<span aria-label="${stats.duration.str}"><span aria-hidden="true">${stats.duration.time}</span>${durationIcon()}</span>
  <p aria-label="${shortenLargeNumber(stats.views)} views" class="views"><span aria-hidden="true">${shortenLargeNumber(stats.views)}</span>${viewsIcon()}</p>` : ''}
  ${renderOpen ?openLink(video.id) : ''}
 </div>`;

const renderInfo = (title, channel,channelId) => html`<p  title="${title}" class="video-title">${title}</p>
${channelId ? html`<a rel="noopener" target="_blank" href="https://youtube.com/channel/${channelId}" class="video-channel">${channel}</a>` : html`<p class="video-channel">${channel}</p>`}`;

const getStats = (video) => {
  if(!video) {
    return null;
  }
  let stats;
  if (video.duration && video.views) {
    stats = {
      duration: convertDuration(video.duration),
      views: video.views
    }
  }
  return stats;
}

const _playlistItem = (video, _onTap, index, viewMore) => {
  const thumbnail = video.smallThumbnail.url;
  const videoTitle = video.title;
  const stats = getStats(video);
  return html`<button tabindex="${viewMore ? "0" : "-1"}" aria-label="Watch video ${videoTitle}, duration: ${stats ? stats.duration.str: ""}" data-index="${index}" @click="${_onTap}"><figure>
  <div class="thumbnail"><img  decoding="async" loading="lazy" width="${video.smallThumbnail.width}" height="${video.smallThumbnail.height}" alt="${videoTitle}" src="${thumbnail}"/></div>
  <figcaption>
  ${renderInfo(videoTitle,video.channelTitle, false)}
  ${renderStats(stats, video)}
  </figcaption>
</figure></button>`;
}

const addPrefetch = (kind, url, as) => {
  const linkEl = document.createElement('link');
  linkEl.rel = kind;
  linkEl.href = url;
  if (as) {
      linkEl.as = as;
  }
  document.head.append(linkEl);
}


const _setThumbs =(video) => {
  if(!video) {
    return ''
  }
  let thumb = video.defaultThumbnail;
  if ('connection' in navigator){
    if(!navigator.connection.saveData) {
      thumb = video.hqThumbnail
      addPrefetch('preload', thumb.url, 'image');
    }
  }
  return `background-image: url("${thumb.url}")`
}

const playIcon =`<svg viewBox="0 0 32 32">
<g transform="translate(-339 -150.484)">
    <path fill="var(--white, #fff)" d="M-1978.639,24.261h0a1.555,1.555,0,0,1-1.555-1.551V9.291a1.555,1.555,0,0,1,1.555-1.551,1.527,1.527,0,0,1,.748.2l11.355,6.9a1.538,1.538,0,0,1,.793,1.362,1.526,1.526,0,0,1-.793,1.348l-11.355,6.516A1.52,1.52,0,0,1-1978.639,24.261Z" transform="translate(2329 150.484)"/>
    <path fill="var(--primary-color, #7f3232)" d="M16.563.563a16,16,0,1,0,16,16A16,16,0,0,0,16.563.563Zm7.465,17.548L12.672,24.627a1.551,1.551,0,0,1-2.3-1.355V9.853a1.552,1.552,0,0,1,2.3-1.355l11.355,6.9A1.553,1.553,0,0,1,24.027,18.111Z" transform="translate(338.438 149.922)" />
</g>
</svg>`
const playButton = `<div class="btn-wrap"><button type="button" class="playbtn">${playIcon}<span class="lyt-visually-hidden">Play</span></button></div>`

/* hacks because lit yt doesnt update */
const _liteYoutube = (id) => `<lite-youtube class="video" params="enablejsapi=1" videoid="${id}">
${playButton}
</lite-youtube>`;
const _litYoutubeHTML = (id) => html`${unsafeHTML(_liteYoutube(id))}`

export class YoutubePlaylist extends LitElement {
  static get styles() {
    return css`
      ${liteYtCss}
      :host {
        --video-size:100%;
        display: flex;
        flex-direction: column;
        background: var(--background, #1a1a1a);
        color: var(--text, #fff);
        --thumbnail-size: 4rem;
        padding-bottom:1rem;
        min-height: 638px;
      }

      h1 {
        font-weight: normal;
      }

      a, a:visited, a:active {
        color: inherit;
        text-decoration: none;
      }

      .grid {
        display: grid;
        flex-wrap: wrap;
        grid-template-columns: repeat(auto-fit,minmax(330px,1fr));
        place-items: center;
        gap:1rem;
      }

      .heading {
        padding: 0;
        margin:0;
      }

      .description {
        padding: 0;
      }

      lite-youtube {
        max-width: initial;
      }

      .playlist-items {
        margin: 0 0 1rem 0;
        position: absolute;
        top:0;
        width: 100%;
      }
      .playlist-item-active {
        background: var(--background-active, #2E2B2B);
      }
      .thumbnail {
        height: 100%;
        margin-right:1rem;
      }

      .playlist-items button {
        outline: none;
        font-family: inherit;
        border: none;
        padding: 0;
        margin:0;
        background:transparent;
        color: inherit;
        text-align: left;
        width: 100%;
        display: flex;
        cursor: pointer;
      }

      :host * :focus {
        outline: 2px solid currentColor;
        outline-offset: 0.3rem;
      }

      .thumbnail img {
        width: var(--thumbnail-size);
        height: var(--thumbnail-size);
        object-fit: cover;
        margin-top:0.5rem;
      }
      figcaption {
        width: 100%;
      }
      ul {
        margin:0;
        padding:0;
      }
      li {
        list-style-type: none;
        padding:1rem;
      }
      li:not(:last-of-type) {
        border-bottom: solid 1px var(--background-active);
      }
      figure {
        margin:0;
        display: flex;
        padding: 0;
        align-items: flex-start;
        width: 100%;
      }
      p {
        margin:0;
      }

      .video-size {
          max-width:var(--video-size,  500px);
          position: relative;
          width: 100%;
      }

      lite-youtube {
        background-size: cover;
        background-position: center;
        background: none !important;
      }
      .video-wrapper {
          position: relative;
          margin: 0rem;
          background-size: cover;
          background-position: center;
      }
      .video-aspect {
        padding-top: 56.25%; /* 16:9, for an aspect ratio of 1:1 change to this value to 100% */

        @supports(aspect-ratio: 16 / 9) {
            width: 100%;
            aspect-ratio: 16 / 9;
            padding-top: initial;
        }
      }
      .video-channel {
        font-weight: 600;
        font-size: 0.875rem;
        color: var(--secondary-text, #b9b8b8);
      }
      .stats {
        display: flex;
        color: inherit;
        font-size:0.875rem;
        margin-top:0.5rem;
      }
      .duration {
        margin-right:0.5rem;
      }
      .stats > * {
        display: flex;
        align-items: center;
        margin-right:1rem;
      }
      .external-link {
        margin-left: auto;
        margin-right:1rem;
      }
      .stats svg {
        stroke: currentColor;
        fill: currentColor;
        height: 1rem;
        width: auto;
        margin-left: 0.25rem;
      }
      .video-title {
        font-size: 0.875rem;
        margin-bottom:0.2rem;
      }

      .video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      .current-video-info {
        margin: 1rem;
      }

      ::-webkit-scrollbar {
        background-color: var(--background);
        width: 16px;
      }

    ::-webkit-scrollbar-track {
        margin-top:1rem;
        background-color: var(--background);
    }

    ::-webkit-scrollbar-thumb {
        background-color: #adadad;
        border-radius: 2px;
        border: 4px solid #adadad;
    }
    ::-webkit-scrollbar-button {
        display:none;
    }

    .lds-ring {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid currentColor;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: currentColor transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg)
      }
    }
    @keyframes pulse {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(1.3);
        }
    }
    .lty-playbtn {
      display: none;
    }
    .playbtn {
      width: 100%;
      height: 100%;
      display: flex;
      position: absolute;
      justify-content: center;
      align-items: center;
      transform: scale(1);
      transition: opacity 250ms linear, transform 100ms ease-in-out;
      opacity: 0.8;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
    .playbtn:focus, .playbtn:hover {
      opacity: 1;
      transform: scale(1.1);
    }
    .playbtn:focus:after, .playbtn:hover:after {
      animation: pulse 1s 4 ease-in-out;
    }
    .playbtn svg {
      width: 15%;
      height: auto;
      z-index: 3;
      border: solid 2px transparent;
      border-radius: 50%;
    }
    .playbtn:focus svg {
      border: solid 2px var(--white, #fff);
    }
    .playbtn:after {
      content: "";
      background: var(--primary-color, #7f3232);
      position: absolute;
      width: 15%;
      border-radius: 50%;
      padding-top: 15%;
      z-index: 1;
      opacity: 0;
    }

    .visually-hidden {
      border: 0;
      clip: rect(0 0 0 0);
      height: auto;
      margin: 0;
      overflow: hidden;
      padding: 0;
      position: fixed;
      width: 1px;
      white-space: nowrap;
    }
    @media (prefers-reduced-motion: reduce) {
      *,
      *::before,
      *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    .bottom-of-list {
      border-bottom: solid 1px var(--background-active);
      font-size: 0.875rem;
    }

    .scroll-wrap {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .view-more {
        outline: none;
        font-family: inherit;
        border: none;
        padding: 0;
        margin:0;
        background:transparent;
        color: inherit;
        cursor: pointer;
        font-size: 1rem;
        text-transform: uppercase;
        display: inline-block;

        text-decoration: none;
        padding: .4rem .7rem;
        border-radius: 1rem;
        margin-top: 1.5rem;
        background: var(--Primary);
        color: #fff;
        font-family: inherit;
        box-shadow: 0 3px 15px rgb(0 0 0 / 40%);
    }

    .mask {
      background-color: var(--mask-color, rgba(255,255,255, 0.5));
      width: 100%;
      height: 100%;
      z-index: 90;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: opacity 300ms ease-in-out, visibility 300ms ease-in-out;

    }

    .playlist-scroll {
        position: relative;
        width: 100%;
        min-height: calc(var(--thumbnail-size)*  3);
        height: 100%;
        max-width: calc(var(--video-size));
        overflow: hidden;
        opacity: 0.3;
    }

    :host([viewmore]) .mask, :host([viewmore]) .mask button {
      opacity: 0;
      visibility: hidden;
    }

    :host([viewmore]) .playlist-scroll {
      opacity: 1;
      overflow: auto;
      pointer-events: initial;
      
    }
  `;
  }

  static get properties() {
    return {
      videos: { type: Array },
      heading: {type: String},
      title: {type: String, reflect: true },
      description: {type: String},
      playlistId: { String },
      currentVideo: {type: String},
      currentVideoIndex: {type: Number},
      listNodes: {type: Array},
      viewMore: {type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.currentVideoIndex = 0;
    this.listNodes = [];
    this.videos = [];
    this.viewMore = false;
  }
  _setCurrentVideo(index) {
    const videoObj = this.videos[index];
    this.currentVideo =videoObj.id;
    this.currentVideoIndex = index;
    this._renderYt();
    const prefix = `Video playlist, current video: `;
    this.title = `${prefix}${videoObj.title}`
  }

  _onTap (e) {
    const iframe = this.shadowRoot.querySelector('iframe');
    if(iframe) {
      iframe.contentWindow.postMessage(window.JSON.stringify( { event: 'command', func: 'stopVideo' } ), '*');
    }
    this._setCurrentVideo(parseInt(e.currentTarget.getAttribute("data-index"), 10));
  }

  _onPlay () {
    const iframe = this.shadowRoot.querySelector('iframe');
    if(iframe) {
      iframe.contentWindow.postMessage(window.JSON.stringify( { event: 'command', func: 'startVideo' } ), '*');
    }
  }

  _renderYt() {
    const wrapper = this.shadowRoot.querySelector('.video-wrapper');
    if(!wrapper) {
      return;
    }
    const liteYt = this.shadowRoot.querySelector('lite-youtube');
    if(liteYt) {
      liteYt.remove();
    }
    wrapper.innerHTML = _liteYoutube(this.currentVideo);

    this.requestUpdate();
    wrapper.querySelector('.playbtn').focus();

  }

  _onVideosSlotChange(e) {
    const childNodes = e.target.assignedNodes({ flatten: true });
    const videoListItems = Array.prototype.filter.call(childNodes, (node) => {
      return node.nodeName === "LI";
    });
    if(!videoListItems.length) {
      return;
    }
    const data = videoListItems.map((videoItem, index) => {
      const itemData = {
        title: videoItem.getAttribute("data-title"),
        channelTitle: videoItem.getAttribute("data-channel-title"),
        channelId: videoItem.getAttribute("data-channel-id"),
        duration: videoItem.getAttribute("data-duration"),
        views: videoItem.getAttribute("data-views"),
        defaultThumbnail: {
          url: videoItem.getAttribute("data-default-thumbnail-url"),
          width: videoItem.getAttribute("data-default-thumbnail-width"),
          height: videoItem.getAttribute("data-default-thumbnail-height")
        },
        smallThumbnail: {
          url: videoItem.getAttribute("data-small-thumbnail-url"),
          width: videoItem.getAttribute("data-small-thumbnail-width"),
          height: videoItem.getAttribute("data-small-thumbnail-height")
        },
        hqThumbnail: {
          url: videoItem.getAttribute("data-hq-thumbnail-url"),
          width: videoItem.getAttribute("data-hq-thumbnail-width"),
          height: videoItem.getAttribute("data-hq-thumbnail-height")
        },
        id: videoItem.getAttribute("data-id"),
      };
     return itemData;
    })
    this.videos = data;
    this.listNodes = videoListItems;
    if(!this.currentVideo) {
      this._setCurrentVideo(0);
    }
  }

  _renderListItem(li, index) {
    if(this.currentVideoIndex === index) {
      li.setAttribute("aria-label", "Current video");
      li.classList.add("playlist-item-active");
    } else {
      li.classList.remove("playlist-item-active")
      li.removeAttribute("aria-label");
    }
    const video = this.videos[index];
    render(html`${_playlistItem(video, this._onTap.bind(this), index, this.viewMore)}`, li)
    return li;
  }

  _onViewMore() {
    this.viewMore = true;
  }

  render() {
    const videoObj = this.videos && this.videos[this.currentVideoIndex];
    const stats = getStats(videoObj);
    const thumbnail = _setThumbs(videoObj);
    return html`
      <slot @slotchange=${this._onVideosSlotChange}></slot>
      <div class="heading"><slot name="heading"></slot></div>
      <div class="description"><slot name="description"></slot></div>
      <div class="grid">
      ${!videoObj ? html`<slot name="fallback"></slot>` :
      html`
        <div class="video-size video-item">
          <div @click="${this._onPlay}" class="video-wrapper video-aspect" style="${thumbnail}">
            ${_litYoutubeHTML(this.currentVideo)}
          </div>
          <div class="current-video-info">
          ${renderInfo(videoObj.title, videoObj.channelTitle, videoObj.channelId)}
          ${renderStats(stats, videoObj, true)}
          </div>
        </div>
        <div class="scroll-wrap">
          <div class="mask"><button aria-hidden="${this.viewMore ? "true" : "false"}" @click="${this._onViewMore}" class="view-more" aria-label="Click to load more videos from the playlist">View more</button></div>
          <div aria-hidden="${!this.viewMore ? "true" : "false"}" class="playlist-scroll"><ul aria-hidden="${!this.viewMore ? "true" : "false"}" class="playlist-items">
            ${this.listNodes.map((li, index) => html `${this._renderListItem(li, index)}`)}
            <slot name="more-link" class="bottom-of-list"></slot>
          </ul></div>
        </div>
      `}
      </div>
    `;
  }
}
