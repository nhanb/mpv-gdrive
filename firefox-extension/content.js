/**
 * Listen for toggle messages from the background script
 */
browser.runtime.onMessage.addListener(message => {
  if (message.command === "trigger") {
    getActiveFile();
  }
});

function getActiveFile() {
  let wrapperEl = document
    .querySelector('[aria-selected="true"]')
    .closest("c-wiz");
  let fileId = wrapperEl.querySelector("[data-id]").dataset.id;
  let fileName = wrapperEl.querySelector("[aria-label]").textContent;
  prompt(`Press Ctrl+C to copy file ID for ${fileName}:`, fileId);
}
