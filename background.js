const INACTIVE_ICON = {
  16: "icons/icon16.png",
  32: "icons/icon32.png",
  64: "icons/icon64.png",
};

const ACTIVE_ICON = {
  16: "icons/icon16-active.png",
  32: "icons/icon32-active.png",
  64: "icons/icon64-active.png",
};

function setTabIcon(tabId, active) {
  if (typeof tabId !== "number" || tabId < 0) return;

  chrome.action.setIcon({
    tabId,
    path: active ? ACTIVE_ICON : INACTIVE_ICON,
  });
}

async function setAllTabsInactive() {
  const tabs = await chrome.tabs.query({});
  for (const tab of tabs) {
    if (typeof tab.id === "number") {
      setTabIcon(tab.id, false);
    }
  }
}

chrome.runtime.onMessage.addListener((message, sender) => {
  if (!message || message.type !== "md-review-set-icon") return;
  if (!sender.tab || typeof sender.tab.id !== "number") return;
  setTabIcon(sender.tab.id, Boolean(message.active));
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading" || changeInfo.url) {
    setTabIcon(tabId, false);
  }
});

chrome.runtime.onInstalled.addListener(() => {
  setAllTabsInactive().catch(() => {});
});

chrome.runtime.onStartup.addListener(() => {
  setAllTabsInactive().catch(() => {});
});
