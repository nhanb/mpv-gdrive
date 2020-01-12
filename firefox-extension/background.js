let isActive = false;

function toggle() {
  isActive = !isActive;

  browser.tabs.query({ currentWindow: true, active: true }).then(tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      command: isActive ? "activate" : "deactivate"
    });
  });

  browser.browserAction.setIcon({
    path: isActive ? "mpv.svg" : "mpv-off.svg"
  });
}

browser.browserAction.onClicked.addListener(toggle);
