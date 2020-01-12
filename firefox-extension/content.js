/**
 * ENTRYPOINTS:
 * Listen for toggle messages from the background script
 */
browser.runtime.onMessage.addListener(message => {
  if (message.command === "activate") {
    getVisibleFiles().forEach(addClickHandler);
    console.log("MPV mode activated");
  } else if (message.command === "deactivate") {
    getVisibleFiles().forEach(removeClickHandler);
    console.log("MPV mode deactivated");
  }
});

/*
 * INTERNALS
 */

function getVisibleFiles() {
  let docs = Array.from(
    document.querySelectorAll('div[data-id][data-target="doc"]')
  ).filter(doc => {
    return doc.offsetParent !== null;
  });
  return docs;
}

// we store plugin-specific data in each element's `mpvgd` attribute.

function addClickHandler(el) {
  el.mpvgd = {};
  el.mpvgd.clickHandler = evt => {
    prompt(
      `Press Ctrl+C to copy file ID for ${getFileName(el)}:`,
      el.dataset.id
    );
  };
  el.addEventListener("click", el.mpvgd.clickHandler);
  el.mpvgd.oldTitle = el.title;
  el.title = `click to copy file ID`;
}

function removeClickHandler(el) {
  el.removeEventListener("click", el.mpvgd.clickHandler);
  el.title = el.mpvgd.oldTitle;
}

function getFileName(el) {
  // Element that carries data-id is a parent div whose children includes
  // multiple things apart from file name, so we need to query the specific
  // child that only contains the file name:
  return el.querySelector("[aria-label]").textContent;
}
