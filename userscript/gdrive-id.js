// ==UserScript==
// @name        Gdrive ID Helper
// @namespace   Violentmonkey Scripts
// @match       https://drive.google.com/drive/*
// @grant       GM_setClipboard
// @version     1.0
// @author      -
// @description 4/17/2020, 11:17:24 AM
// ==/UserScript==

function getActiveFile() {
  let wrapperEl = document
    .querySelector('[aria-selected="true"]')
    .closest("c-wiz");
  return {
    id: wrapperEl.querySelector("[data-id]").dataset.id,
    name: wrapperEl.querySelector("[aria-label]").textContent,
  };
}

function copyMpvCommand(event) {
  let f = getActiveFile();

  GM_setClipboard(`mpv gdrive://${f.id}`);

  // Visual cue via button text
  let btnText = event.target.innerHTML;
  event.target.innerHTML = "Copied.";
  event.target.setAttribute("disabled", "disabled");
  setTimeout(function () {
    event.target.innerHTML = btnText;
    event.target.removeAttribute("disabled");
  }, 1000);
}

function buildUi() {
  let container = document.createElement("div");

  let btn = document.createElement("button");
  btn.innerHTML = "Copy mpv command";
  btn.addEventListener("click", copyMpvCommand);
  container.appendChild(btn);

  container.style.cssText = `
    position: fixed;
    display: inline-block;
    bottom: 3px;
    left: 3px;
    z-index: 999;
    border: 1px solid red;
  `;
  return container;
}

// Main
let ui = buildUi();
document.body.appendChild(ui);
