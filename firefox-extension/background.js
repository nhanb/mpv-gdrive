function toggle() {
  browser.tabs.query({ currentWindow: true, active: true }).then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      command: "trigger"
    });
  });
}

browser.browserAction.onClicked.addListener(toggle);
