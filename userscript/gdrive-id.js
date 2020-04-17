// ==UserScript==
// @name        Gdrive ID Helper
// @namespace   Violentmonkey Scripts
// @match       https://drive.google.com/drive/*
// @grant       GM_setClipboard
// @version     1.0
// @author      -
// @description 4/17/2020, 11:17:24 AM
// ==/UserScript==

const containerId = "nhanb-gdrive-id-helper";

function showMsg(msg) {
  let el = document.querySelector(`#${containerId} > span`);
  el.innerHTML = msg;
  setTimeout(function () {
    el.innerHTML = "";
  }, 2000);
}

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
  let content = `mpv gdrive://${f.id}`;
  GM_setClipboard(content);
  showMsg(`Copied: ${content}`);
}

function copyId(event) {
  let f = getActiveFile();
  let content = f.id;
  GM_setClipboard(content);
  showMsg(`Copied: ${content}`);
}

function buildUi() {
  // Top level container div
  let container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    display: inline-block;
    bottom: 5px;
    left: 5px;
    z-index: 999;
  `;
  container.setAttribute("id", containerId);

  // Button to copy MPV command
  let mpvBtn = document.createElement("button");
  mpvBtn.innerHTML = "Copy mpv command";
  mpvBtn.addEventListener("click", copyMpvCommand);
  container.appendChild(mpvBtn);

  // Button to copy GDrive file ID only
  let idBtn = document.createElement("button");
  idBtn.innerHTML = "Copy ID";
  idBtn.addEventListener("click", copyId);
  idBtn.style.cssText = "margin-left: 5px;";
  container.appendChild(idBtn);

  // Status message
  let msgSpan = document.createElement("span");
  msgSpan.style.cssText = `
    font-family: monospace;
    padding: 10px;
    margin-left: 5px;
  `;
  container.appendChild(msgSpan);

  return container;
}

// Main
let ui = buildUi();
document.body.appendChild(ui);
